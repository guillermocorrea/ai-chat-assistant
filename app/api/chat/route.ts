import {createAzure} from '@ai-sdk/azure'
import {streamText} from 'ai'
import {z} from 'zod'

const azure = createAzure({
	resourceName: process.env.AZURE_OPENAI_RESOURCE_NAME,
	apiKey: process.env.AZURE_OPENAI_API_KEY
})

export async function POST(req: Request) {
	// This is being called from the useChat hook in the chat interface.
	const {messages} = await req.json()

	console.log('Received messages:', messages)

	const result = streamText({
		model: azure('gpt-4o-mini'),
		messages,
		system: `You are a helpful developer assistant specializing in web development and GitHub.

    When helping users:
    - Keep explanations concise but thorough
    - Include code examples when relevant
    - Format code with proper syntax highlighting
    - Cite sources when possible
    - If a user asks about a GitHub profile, use the getGitHubProfile tool

    Your tone should be professional but friendly. When you don't know something, admit it rather than making up information.`,
		tools: {
			getGitHubProfile: {
				description: 'Get public information about a GitHub user profile',
				parameters: z.object({
					username: z.string().describe('The GitHub username to look up')
				}),
				execute: async ({username}) => {
					try {
						// Fetch the user profile from GitHub's public API
						const response = await fetch(
							`https://api.github.com/users/${username}`
						)

						if (!response.ok) {
							if (response.status === 404) {
								return {error: `User ${username} not found`}
							}
							return {
								error: `GitHub API error: ${response.status}`
							}
						}

						const data = await response.json()

						// Return selected profile information
						return {
							login: data.login,
							name: data.name,
							bio: data.bio,
							public_repos: data.public_repos,
							followers: data.followers,
							following: data.following,
							html_url: data.html_url,
							avatar_url: data.avatar_url
						}
					} catch (error) {
						return {error: 'Failed to fetch GitHub profile'}
					}
				}
			}
		}
	})

	return result.toDataStreamResponse({
		getErrorMessage: (error) => {
			console.error('Error in toDataStreamResponse:', error)
			return JSON.stringify({error: 'Failed to process the request'})
		}
	})
}

'use client'

import {User} from 'lucide-react'
import {BotAvatar} from '@/components/bot-avatar'
import {Message} from 'ai'
import {GitHubProfileCard} from '@/components/github-profile-card'
import ReactMarkdown from 'react-markdown'
import {CodeBlock} from '@/components/code-block'

export function ChatMessage({message}: {message: Message}) {
	const {role, content, toolInvocations} = message
	const hasToolCalls = toolInvocations && toolInvocations.length > 0
	const isUserMessage = role === 'user'

	return (
		<div
			className={`flex ${role === 'user' ? 'justify-end' : 'justify-start'}`}>
			<div
				className={`flex max-w-3xl ${role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
				{/* Avatar section */}
				<div className={role === 'user' ? 'ml-3' : 'mr-3'}>
					{role === 'user' ? (
						<div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
							<User className="h-4 w-4 text-gray-600" strokeWidth={1.5} />
						</div>
					) : (
						<BotAvatar />
					)}
				</div>

				{/* Message bubble */}
				<div
					className={`rounded-2xl p-2 ${isUserMessage ? 'bg-black text-white' : 'bg-gray-50 text-black'} group relative`}>
					<div
						className={`prose prose-l max-w-none ${isUserMessage ? 'text-white' : undefined}`}>
						{content && (
							<ReactMarkdown
								components={{
									code({className, children, ...props}) {
										const match = /language-(\w+)/.exec(className || '')
										return match ? (
											<CodeBlock language={match[1]}>
												{String(children)}
											</CodeBlock>
										) : (
											<code className={className} {...props}>
												{children}
											</code>
										)
									}
								}}>
								{content}
							</ReactMarkdown>
						)}
					</div>

					{/* Tool calls and results */}
					{hasToolCalls && (
						<div className="mt-3 space-y-3">
							{/* @ts-ignore - Ignoring toolInvocations type issues */}
							{toolInvocations.map((tool) => (
								<div
									key={tool.toolCallId}
									className="rounded border border-gray-200 p-3">
									<p className="text-xs font-semibold text-gray-500">
										Tool: {tool.toolName}
									</p>

									{/* Parameters */}
									{tool.state === 'call' && (
										<div className="mt-2">
											<p className="text-xs font-semibold text-gray-500">
												Parameters:
											</p>
											<pre className="mt-1 max-h-40 overflow-auto rounded bg-gray-100 p-2 text-xs">
												{JSON.stringify(tool.args, null, 2)}
											</pre>
										</div>
									)}

									{/* Loading state */}
									{tool.state === 'call' && (
										<div className="mt-2 text-sm text-gray-500">
											<div className="flex items-center space-x-2">
												<div className="h-2 w-2 animate-pulse rounded-full bg-gray-300"></div>
												<div
													className="h-2 w-2 animate-pulse rounded-full bg-gray-300"
													style={{animationDelay: '150ms'}}></div>
												<div
													className="h-2 w-2 animate-pulse rounded-full bg-gray-300"
													style={{animationDelay: '300ms'}}></div>
											</div>
										</div>
									)}

									{/* Results - with enhanced display for GitHub profiles */}
									{tool.state === 'result' && (
										<div className="mt-2">
											<p className="text-xs font-semibold text-gray-500">
												Result:
											</p>

											{/* GitHub Card for GitHub profile tool */}
											{tool.toolName === 'getGitHubProfile' ? (
												<div className="mt-2">
													<GitHubProfileCard {...tool.result} />
												</div>
											) : (
												// Default display for other tools
												<pre className="mt-1 max-h-40 overflow-auto rounded bg-gray-100 p-2 text-xs">
													{JSON.stringify(tool.result, null, 2)}
												</pre>
											)}
										</div>
									)}
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

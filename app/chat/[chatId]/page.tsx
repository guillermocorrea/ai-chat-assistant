import {Sidebar} from '@/components/sidebar'
import {ChatInterface} from '@/components/chat-interface'
import {notFound} from 'next/navigation'
import {Message} from 'ai'

// Properly typed mock data
const chatData: Record<string, {title: string; messages: Message[]}> = {
	'1': {
		title: 'How to learn React',
		messages: [
			{id: '1', role: 'user', content: "What's the best way to learn React?"},
			{
				id: '2',
				role: 'assistant',
				content:
					'Start with JavaScript fundamentals, then move to React basics. Practice with small projects and learn hooks as you go.'
			}
		]
	},
	'2': {
		title: 'An example of js map function',
		messages: [
			{
				id: '1',
				role: 'user',
				content: 'Can you give me an example of the map function?'
			},
			{
				id: '2',
				role: 'assistant',
				content:
					"Certainly! The map function creates a new array populated with the results of calling a provided function on every element in the calling array. Here's an example:\n\n```javascript\nconst numbers = [1, 2, 3, 4];\nconst doubled = numbers.map(num => num * 2);\nconsole.log(doubled); // Output: [2, 4, 6, 8]\n```\n\nIn this example, we use map to double each number in the array."
			}
		]
	}
}

export default function ChatPage({params}: {params: {chatId: string}}) {
	const {chatId} = params

	// Simple check if chat exists
	if (!chatData[chatId as keyof typeof chatData]) {
		notFound()
	}

	const chat = chatData[chatId as keyof typeof chatData]

	return (
		<div className="flex h-screen bg-white">
			<Sidebar activeChatId={chatId} />
			<ChatInterface initialMessages={chat.messages} title={chat.title} />
		</div>
	)
}

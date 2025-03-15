import {Sidebar} from '@/components/sidebar'
import {ChatInterface} from '@/components/chat-interface'

// Default chat page component that displays when no specific chat is selected
export default function ChatPage() {
	return (
		<div className="flex h-screen bg-white">
			<Sidebar />
			<ChatInterface />
		</div>
	)
}

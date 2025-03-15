'use client'

import {useState} from 'react'
import {Copy, CheckCheck} from 'lucide-react'

interface CopyButtonProps {
	content: string
}

export function CopyButton({content}: CopyButtonProps) {
	const [copied, setCopied] = useState(false)

	const handleCopy = async () => {
		if (!content) return

		try {
			await navigator.clipboard.writeText(content)
			setCopied(true)
			setTimeout(() => setCopied(false), 2000) // Reset after 2 seconds
		} catch (err) {
			console.error('Failed to copy text: ', err)
		}
	}

	return (
		<div className="absolute right-2 top-2 opacity-0 transition-opacity group-hover:opacity-100">
			<button
				onClick={handleCopy}
				className="flex items-center rounded p-1 hover:bg-gray-200"
				title="Copy to clipboard">
				{copied ? (
					<CheckCheck className="h-4 w-4 text-green-600" />
				) : (
					<Copy className="h-4 w-4 text-gray-500" />
				)}
				<span className="sr-only">Copy</span>
			</button>
		</div>
	)
}

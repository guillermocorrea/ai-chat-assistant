'use client'

import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {oneDark} from 'react-syntax-highlighter/dist/cjs/styles/prism'
import {CopyButton} from './copy-button'

interface CodeBlockProps {
	language: string
	children: string
	className?: string
}

export function CodeBlock({
	language,
	children,
	className,
	...props
}: CodeBlockProps & React.HTMLAttributes<HTMLPreElement>) {
	return (
		<div className="group relative">
			<CopyButton content={children} />
			<SyntaxHighlighter
				// @ts-ignore - Known issue with type definitions
				style={oneDark}
				language={language}
				PreTag="div"
				className={`rounded-md ${className || ''}`}
				{...props}>
				{children.replace(/\n$/, '')}
			</SyntaxHighlighter>
		</div>
	)
}

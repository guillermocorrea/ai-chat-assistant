import type React from 'react'
import './globals.css'
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import {
	ClerkProvider,
	SignInButton,
	SignUpButton,
	SignedIn,
	SignedOut,
	UserButton
} from '@clerk/nextjs'

const inter = Inter({
	subsets: ['latin'],
	variable: '--font-inter',
	display: 'swap'
})

export const metadata: Metadata = {
	title: 'FrontendTrail - AI Assistant for Developers',
	description:
		'Elegant AI assistant with intuitive interface and seamless experience',
	metadataBase: new URL('https://frontendtrail.vercel.app')
}

export default function RootLayout({children}: {children: React.ReactNode}) {
	return (
		<ClerkProvider>
			<html lang="en" suppressHydrationWarning>
				<body className={`${inter.variable} font-sans antialiased`}>
					<header className="flex h-16 items-center justify-end gap-4 p-4">
						<SignedOut>
							<SignInButton />
							<SignUpButton />
						</SignedOut>
						<SignedIn>
							<UserButton />
						</SignedIn>
					</header>
					{children}
				</body>
			</html>
		</ClerkProvider>
	)
}

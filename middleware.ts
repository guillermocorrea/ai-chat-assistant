import {clerkMiddleware, createRouteMatcher} from '@clerk/nextjs/server'

// Match all routes except for the ones that start with /api/auth
const isPrivateRoute = createRouteMatcher(['/chat'])

export default clerkMiddleware(async (auth, req) => {
	if (isPrivateRoute(req)) {
		// Skip authentication for Next.js data requests
		await auth.protect()
	}
})

export const config = {
	matcher: [
		// Skip Next.js internals and all static files, unless found in search params
		'/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
		// Always run for API routes
		'/(api|trpc)(.*)'
	]
}

# NextAuth.js Session Undefined in getServerSideProps

This repository demonstrates a bug where the NextAuth.js session is undefined in `getServerSideProps` even after successful authentication. The issue occurs only on the initial request to the page; subsequent requests correctly populate the session object.

## Bug Description

The `getServerSideProps` function in `pages/about.js` attempts to access the session from `unstable_getServerSession`. While authentication works as expected, the session remains undefined during the initial page load.  Subsequent page refreshes or navigation to the about page resolve the issue, suggesting a caching or race condition.

## How to Reproduce

1. Clone this repository.
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
4. Navigate to `/about`. Observe that the session is undefined (displays "You are not logged in").
5. Refresh the page or navigate away and back to `/about`. The session is now correctly populated.

## Potential Solutions (Not implemented in this repo's solution):

* Investigate potential caching issues in Next.js or NextAuth.js.
* Implement a retry mechanism in `getServerSideProps` to handle the initial undefined session.
* Further investigation of the `unstable_getServerSession` function's behaviour, potentially by logging calls and analysing timing.

## Solution
The solution provided in `aboutSolution.js` shows a workaround that uses `getStaticProps` instead of `getServerSideProps` and redirects to the login page if a session is not available. This works by pre-rendering the page with data about session existence, rather than waiting until the server-side props are rendered and passed in on the client-side.
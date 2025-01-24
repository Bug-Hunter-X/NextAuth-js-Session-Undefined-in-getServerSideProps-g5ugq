```javascript
// pages/index.js
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Welcome to my Next.js app!</h1>
      <Link href="/about">
        <a>Go to About Page</a>
      </Link>
    </div>
  );
}
```
```javascript
// pages/about.js
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';

export async function getServerSideProps(context) {
  const session = await unstable_getServerSession(context, authOptions);

  return {
    props: {
      session
    },
  };
}

export default function About({ session }) {
  if (session) {
    return (
      <div>
        <h1>About Page</h1>
        <p>You are logged in as {session.user.email}</p>
      </div>
    );
  } else {
    return (
      <div>
        <h1>About Page</h1>
        <p>You are not logged in</p>
      </div>
    );
  }
}
```
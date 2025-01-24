```javascript
// pages/about.js
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';
import { useRouter } from 'next/router';

export async function getServerSideProps(context) {
  const session = await unstable_getServerSession(context, authOptions);
  const router = useRouter();
  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }
  return {
    props: {
      session
    }
  }
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
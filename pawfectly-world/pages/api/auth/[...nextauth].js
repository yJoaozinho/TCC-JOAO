import NextAuth from 'next-auth';
import { CredentialsProvider } from 'next-auth/providers';


export default NextAuth({
    CredentialsProvider: [
    CredentialsProvider.Credentials({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      authorize: async (credentials) => {
       
        const response = await fetch('https://randomuser.me/api/');
        const data = await response.json();

        
        const user = data.results[0];
        if (user) {
          return Promise.resolve(user);
        } else {
          return Promise.resolve(null);
        }
      }
    })
  ],
 
});
import NextAuth,{NextAuthOpitions} from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const NextAuthOpitions =  {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'email', type: 'text'},
                password: {label: 'password', type: 'pasword'}
            },

            async authorize(credentials, req) {
                const response = await fetch('https://jsonplaceholder.typicode.com/users', {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: credentials?.email,
                        password: credentials.password
                    })
                })
                const user = await response.json()

                if (user && response.ok) {
                    return user
                }else{
                    return null
                }
            },


        })
    ],
    pages: {
        signIn: '/'
    }

}

const handler = NextAuth(NextAuthOpitions)

export { handler as GET, handler as POST}
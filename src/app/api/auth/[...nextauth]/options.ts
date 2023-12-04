import  type {NextAuthOptions} from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"



export const options: NextAuthOptions= {
    providers:[
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,  
          }),       
        GithubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
          }),

          CredentialsProvider({
            name:'credentials',
            credentials:{
            username: {
                label:'nome/email',
                type:'text',
                placeholder:'digite seu nome'
            },
            password: {
                label:'senha',
                type:'password',
                placeholder:'digite sua senha'
            }
            },
            async authorize (credentials) {
                const user = {id:"10001", name:"noor", password:'noor' }
                if(credentials?.username === user.name && 
                    credentials?.password === user.password) {
                        return user;
                }else {
                    return null;
                }
            }
          }),
    ],
}
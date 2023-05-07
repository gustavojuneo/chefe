// eslint-disable-next-line no-unused-vars
import NextAuth from 'next-auth/next'

declare module 'next-auth' {
  export interface User {
    id: string
    name: string
    email: string
    image: string
  }

  export interface Session {
    user: User
  }
}

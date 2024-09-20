// app/api/auth/[...nextauth]/route.ts

import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string; 
  }

  interface JWT {
    accessToken?: string; 
  }
}

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: '/auth/signin', 
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
        session.accessToken = token.accessToken as string;
        return session;
      },
  },
});

export { handler as GET, handler as POST };

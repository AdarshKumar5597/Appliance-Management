export const authConfig = {
    pages: {
      signIn: "/login",
    },
    providers: [],
    callbacks: {
      // FOR MORE DETAIL ABOUT CALLBACK FUNCTIONS CHECK https://next-auth.js.org/configuration/callbacks
      async jwt({ token, user }) {
        if (user) {
          // console.log("user: ", user);
          token.id = user.id;
          token.username = user.username;
        }
        console.log("token: ", token);
        return token;
      },
      async session({ session, token }) {
        if (token) {
          session.user.id = token.id;
          session.user.username = token.username;
        }
        return session;
      },
      authorized({ auth, request }) {
        const user = auth?.user;
        const isOnLoginPage = request.nextUrl?.pathname.startsWith("/login");
  
        if (isOnLoginPage && user) {
          console.log("user in authorized: ", user);
        }
  
        return true
      },
    },
  };

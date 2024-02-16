import { withAuth } from "next-auth/middleware"

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    // console.log(req);
  },
  {
    callbacks: {
      authorized({ req , token }) {
        // console.log(token);
        if(token) return true // If there is a token, the user is authenticated
      }
    }
  }
)

export const config = { matcher: ["/dashboard", "/auth/register"] }
import { graphql } from 'msw';
export const handlers = [
  // Handles a "Login" mutation
  graphql.mutation('login', (req, res, ctx) => {
    const { username } = req.variables
    sessionStorage.setItem('is-authenticated', username)
    return res(
      ctx.data({
        login: {
          username,
        },
      }),
    )
  }),
  // Handles a "GetUserInfo" query
//   graphql.query('GetUserInfo', (req, res, ctx) => {
//     const authenticatedUser = sessionStorage.getItem('is-authenticated')
//     if (!authenticatedUser) {
//       return res(
//         ctx.errors([
//           {
//             message: 'Not authenticated',
//             errorType: 'AuthenticationError',
//           },
//         ]),
//       )
//     }
//     return res(
//       ctx.data({
//         user: {
//           username: authenticatedUser,
//           firstName: 'John',
//         },
//       }),
//     )
//   }),




]
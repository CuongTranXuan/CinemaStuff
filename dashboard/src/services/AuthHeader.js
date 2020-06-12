export function authHeader () {
    // return authorization header with jwt token
    const user = JSON.parse(localStorage.getItem('user'))

    if (user && user.accessToken) {
        // for Node.js Express back-end
        return {
          'x-access-token': user.accessToken,
          'x-userid': user.id,
        }
    } else {
      return {}
    }
}

/**
 * A simple utilitarian function that return the token stored in the local storage
 * if it exists
 */
function getLSToken() {
  return localStorage.getItem('token')
}

export default getLSToken

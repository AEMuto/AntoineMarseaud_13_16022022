/**
 * A simple utilitarian function that store our token with a key of 'token' in
 * the local storage
 * @param token
 */
function setLSToken(token:string){
  localStorage.setItem('token', token)
}

export default setLSToken
/**
 * A simple utilitarian function that removes the token from the local storage
 * if it exists
 */
function removeLSToken(){
  localStorage.removeItem('token')
}

export default removeLSToken
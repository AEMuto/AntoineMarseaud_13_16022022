export type typeParam = 'email' | 'password' | 'name'
type returnValue = {
  valid: boolean,
  message: string
}

const invalidCharacter = new RegExp('[^\\p{Alphabetic}]', 'u');
const passwordRegexp = new RegExp('^(?=.*\\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\\w\\d\\s:])([^\\s]){8,16}$\n', 'gm');
const emailRegexp = new RegExp('^([\\w-]+(?:\\.[\\w-]+)*)@((?:[\\w-]+\\.)*\\w[\\w-]{0,66})\\.([a-z]{2,6}(?:\\.[a-z]{2})?)$', 'i');

function validateInput(input: string, type: typeParam): returnValue {
  if (!input) {
    return { valid: false, message: `This field is required` };
  }

  switch (type) {
    case 'email':
      if (!input.match(emailRegexp)) {
        return { valid: false, message: 'Invalid email' };
      }
      return { valid: true, message: 'Correct email' };
    case 'name':
      if (input.match(invalidCharacter)) {
        return { valid: false, message: 'Alphabetic letters only' };
      }
      return { valid: true, message: 'Correct name' };
    case 'password':
      if (!input.match(passwordRegexp)) {
        return { valid: false, message: 'Invalid password' };
      }
      return { valid: true, message: 'Correct password' };
    default:
      throw new Error(`Invalid 'type' parameter provided`)
  }

}

export default validateInput;
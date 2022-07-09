export type typeParam = 'email' | 'password' | 'name'
type returnValue = {
  valid: boolean,
  message: string
}

const invalidCharacter = new RegExp('[^\\p{Alphabetic}]', 'u');
const passwordRegexp = new RegExp('^(?=.*\\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\\w\\d\\s:])([^\\s]){8,16}$\n', 'gm');
const emailRegexp = new RegExp('^([\\w-]+(?:\\.[\\w-]+)*)@((?:[\\w-]+\\.)*\\w[\\w-]{0,66})\\.([a-z]{2,6}(?:\\.[a-z]{2})?)$', 'i');

/**
 * Function that dictate whether the value we pass it in is valid or not, based
 * on a set of regex expressions. Also, we need to purvey a type parameter, which
 * indicate the origin of the input (email, name, password).
 * It doesn't modify our error state. Error state modification should happen based
 * on the return value that this function provides (SOC).
 * @param input
 * @param type
 */
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
        return {
          valid: false,
          message: 'Password should have a length between 8 to 16, and contains at least one lowercase, character one uppercase character, one special character, one number',
        };
      }
      return { valid: true, message: 'Correct password' };
    default:
      throw new Error(`Invalid 'type' parameter provided`);
  }

}

export default validateInput;
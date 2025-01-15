export function hasCapitalLetter(str: string) {
  const capitalLetterRegex = /[A-Z]/;
  return capitalLetterRegex.test(str);
}

export function hasSmallLetter(str: string) {
  const capitalLetterRegex = /[a-z]/;
  return capitalLetterRegex.test(str);
}

export function hasSpecialCharacter(str: string) {
  const specialCharacterRegex = /[^a-zA-Z0-9]/;
  return specialCharacterRegex.test(str);
}

export function hasNumber(str: string) {
  const numberRegex = /[0-9]/;
  return numberRegex.test(str);
}

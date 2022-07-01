// @ts-nocheck

export default class CpfValidator {
  constructor(readonly digitsArray: Array) {

  }

  test() {
    const digit_1 = this.calculateDigit_1(this.digitsArray)
    const digit_2 = this.calculateDigit_2(this.digitsArray, digit_1)
  
    const checkDigits = this.digitsArray.slice(9,11).join("")  
    const calculatedDigits = `${digit_1}${digit_2}`;
    
    return checkDigits === calculatedDigits
  }

  private calculateDigit_1(digitsArray) {
    let sum = 0
    const normalDigitsArray = digitsArray.slice(0, 9)
    
    normalDigitsArray.forEach(
      (currentDigit, index) => sum += (11 - (index + 1)) * currentDigit
    );
  
    const divisionRemainder = sum % 11;
    const digit_1 = (divisionRemainder < 2) ? sum = 0 : 11 - divisionRemainder;
    return digit_1
  }
  
  private calculateDigit_2(digitsArray, digit_1) {
    let sum = 0
    const normalDigitsArray = digitsArray.slice(0,9)
    normalDigitsArray.forEach(
      (currentDigit, index) => sum += (12 - (index + 1)) * currentDigit
    );
    sum += 2 * digit_1;  
    const divisionRemainder = (sum % 11);
    const digit_2 = (divisionRemainder < 2) ? 0 : 11 - divisionRemainder
    return digit_2
  }
}
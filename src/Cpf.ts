import CpfValidator from "./CpfValidator";

export default class Cpf {
  validator: CpfValidator
  CPF_LENGTH = 11
  FORMATTED_CPF_LENGTH = 14

  constructor(readonly documentNumber: String) {
    if (this.isBlank()) throw new Error("Invalid CPF");
    if (!this.isValidLength()) throw new Error("Invalid CPF");
    if (this.areEqualDigits()) throw new Error("Invalid CPF");

    this.validator = new CpfValidator(this.getDigitsArray())
  }

  getDigitsArray() {
    return this.getCleanDocumentNumber().split("")
  }

  getCleanDocumentNumber() {
    return this.documentNumber
      .replace('.','')
      .replace('.','')
      .replace('-','')
      .replace(" ","");  
  }

  isValid() {
    return this.validator.test();
  }

  private isBlank() {
    if (!!this.documentNumber) return false;
  
    return true;
  }
  
  private isValidLength() {
    if (this.documentNumber.length < this.CPF_LENGTH) return false
    if (this.documentNumber.length > this.FORMATTED_CPF_LENGTH) return false
  
    return true
  }

  private areEqualDigits() {
    const digitsArray = this.getDigitsArray()
    return digitsArray.every(c => c === digitsArray[0])
  }
}
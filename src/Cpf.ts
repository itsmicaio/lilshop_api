import CpfValidator from "./CpfValidator";

export default class Cpf {
  validator: CpfValidator

  constructor(readonly documentNumber: string) {
    this.validator = new CpfValidator(this.getDigitsArray())
    if (!this.isValid(this.documentNumber)) throw new Error("Invalid CPF");
  }

  getDigitsArray() {
    return this.getCleanDocumentNumber().split("")
  }

  getCleanDocumentNumber() {
    return this.documentNumber.replace(/\D+/g, "");
  }

  private isValid(cpf: string) {
    if (this.isBlank(cpf)) return false
    cpf = this.getCleanDocumentNumber()
    if (!this.isValidLength(cpf)) return false
    if (this.areEqualDigits(cpf)) return false

    return this.validator.test();
  }

  private isBlank(cpf: string) {
    return !cpf
  }
  
  private isValidLength(cpf: string) {
    return cpf.length === 11
  }

  private areEqualDigits(cpf: string) {
    const [firstDigit] = cpf
    return [...cpf].every(digit => digit === firstDigit)
  }
}
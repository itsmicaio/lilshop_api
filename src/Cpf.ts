import CpfValidator from "./CpfValidator";

export default class Cpf {
  validator: CpfValidator

  constructor(readonly documentNumber: string) {
    if (this.isBlank(documentNumber)) throw new Error("Invalid CPF");
    if (!this.isValidLength(this.getCleanDocumentNumber())) throw new Error("Invalid CPF");
    if (this.areEqualDigits(this.getCleanDocumentNumber())) throw new Error("Invalid CPF");

    this.validator = new CpfValidator(this.getDigitsArray())
  }

  getDigitsArray() {
    return this.getCleanDocumentNumber().split("")
  }

  getCleanDocumentNumber() {
    return this.documentNumber.replace(/\D+/g, "");
  }

  isValid() {
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
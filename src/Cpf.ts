export default class Cpf {
  value: string;

  constructor(cpf: string) {
    if (!this.isValid(cpf)) throw new Error("Invalid CPF");
    this.value = cpf
  }

  private isValid(cpf: string) {
    if (this.isBlank(cpf)) return false
    cpf = this.removeNonDigits(cpf)
    if (!this.isValidLength(cpf)) return false
    if (this.areEqualDigits(cpf)) return false
    const digit_1 = this.calculateDigit(cpf, 10)
    const digit_2 = this.calculateDigit(cpf, 11)
    const checkDigits = cpf.slice(9)  
    const calculatedDigits = `${digit_1}${digit_2}`;
    return checkDigits === calculatedDigits
  }

  private isBlank(cpf: string) {
    return !cpf
  }

  private removeNonDigits(cpf: string) {
    return cpf.replace(/\D+/g, "");
  }
  
  private isValidLength(cpf: string) {
    return cpf.length === 11
  }

  private areEqualDigits(cpf: string) {
    const [firstDigit] = cpf
    return [...cpf].every(digit => digit === firstDigit)
  }

  private calculateDigit (cpf: string, multiplier: number) {
		let total = 0;
		for (const digit of cpf) {
			if (multiplier > 1) {
				total += parseInt(digit) * multiplier--;
			}
    };
		const rest = total%11;
		return (rest < 2) ? 0 : 11 - rest;
	}
}
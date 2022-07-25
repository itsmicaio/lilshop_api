export default class OrderCode {
  SEQUENTIAL_LENGTH = 8;
  value: string;

  constructor(readonly date: Date = new Date(), readonly sequence: number) {
    this.value = this.generate()
  }

  generate() {
    const year = this.date.getFullYear()
    return `${year}${this.sequence.toFixed().padStart(this.SEQUENTIAL_LENGTH, "0")}`
  };
}
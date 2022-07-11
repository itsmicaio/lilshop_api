export default class Dimension {
  constructor(
    readonly length: number,
    readonly width: number,
    readonly height: number,
    readonly weight: number
  ) {
    if (length < 0) throw new Error("Invalid length")
    if (width < 0) throw new Error("Invalid width")
    if (height < 0) throw new Error("Invalid height")
    if (weight < 0) throw new Error("Invalid weight")
  }

  calculateVolume() {
    const centimeters = this.length * this.width * this.height
    const meters = centimeters / 1000000
    return meters
  }

  calculateDensity() {
    return Math.round(this.weight / this.calculateVolume())
  }
}
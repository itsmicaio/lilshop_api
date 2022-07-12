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

  getVolume() {
    return this.length / 100 * this.width / 100 * this.height / 100
  }

  getDensity() {
    if(!this.getVolume()) return 0
    return Math.round(this.weight / this.getVolume())
  }
}
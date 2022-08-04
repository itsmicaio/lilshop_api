import Coordinate from "./Coordinate";

export default class Zipcode {
  constructor(
    readonly code: string,
    readonly state: string,
    readonly city: string,
    readonly coordinates: Coordinate) {
  }
}
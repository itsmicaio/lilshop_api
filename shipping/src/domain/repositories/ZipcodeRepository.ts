import Zipcode from "../entities/Zipcode";

export default interface ZipcodeRepository {
  getZipcode(code: string): Promise<Zipcode>
}
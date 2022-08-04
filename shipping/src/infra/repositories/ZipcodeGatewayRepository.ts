import Zipcode from "../../domain/entities/Zipcode";
import ZipcodeRepository from "../../domain/repositories/ZipcodeRepository";
import Coordinate from "../../domain/entities/Coordinate";
import ZipcodeGateway from "../../application/gateway/ZipcodeGateway";

export default class ZipcodeGatewayRepository implements ZipcodeRepository {
  constructor(readonly zipcodeGateway: ZipcodeGateway) {}

  async getZipcode(code: string): Promise<Zipcode> {
    const output = await this.zipcodeGateway.getZipcode({code})
    
    const coordinates = new Coordinate(output.coordinates.lat, output.coordinates.lng)
    const zipcode = new Zipcode(code, output.state, output.city, coordinates)
    return zipcode
  }
}
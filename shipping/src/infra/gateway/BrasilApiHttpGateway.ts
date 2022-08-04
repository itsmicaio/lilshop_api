import ZipcodeGateway, {Input, Output} from "../../application/gateway/ZipcodeGateway";
import Gateway from "./Gateway";

export default class BrasilApiHttpGateway implements ZipcodeGateway {
  constructor(readonly gateway: Gateway) {
  }

  async getZipcode(input: Input): Promise<Output> {
    const response = await this.gateway.call(`/cep/v2/${input.code}`, "get")
    console.log(response.data)
    return {
      code: response.data.cep,
      state: response.data.state,
      city: response.data.city,
      coordinates: {
        lat: parseFloat(response.data.location.coordinates.latitude),
        lng: parseFloat(response.data.location.coordinates.longitude)
      }
    }
  }
}
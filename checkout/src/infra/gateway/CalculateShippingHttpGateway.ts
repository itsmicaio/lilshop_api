import CalculateShippingGateway, { Input, Output } from "../../application/gateway/CalculateShippingGateway";
import Gateway from "./Gateway";

export default class CalculateShippingHttGateway implements CalculateShippingGateway {
  constructor(readonly gateway: Gateway) {
  }

  async calculate(input: Input): Promise<Output> {
    const response = await this.gateway.call("/calculateShipping", "post", input)

    return {
      total: response.data.total
    }
  }
}
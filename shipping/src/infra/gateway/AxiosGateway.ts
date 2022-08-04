import Gateway, {Output} from "./Gateway";
import axios from 'axios'

export default class AxiosGateway implements Gateway {
  constructor(readonly baseUrl: string) {
  }

  async call(path: string, method: string, data: any): Promise<Output> {
    try {
      const response = await axios({
        url: `${this.baseUrl}${path}`,
        method,
        data
      })

      return {
        success: true,
        status: response.status,
        data: response.data
      }
    } catch (error: any) {
      return {
        success: true,
        status: error.request.status,
        data: JSON.parse(error.request.response)
      }
    }
  }
}
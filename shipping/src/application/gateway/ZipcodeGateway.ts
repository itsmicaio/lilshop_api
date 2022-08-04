export default interface ZipcodeGateway {
  getZipcode(input: Input): Promise<Output>
}

export type Input = {
	code: string,
}

export type Output = {
  code: string,
  state: string,
  city: string,
  coordinates: {
    lat: number,
    lng: number
  }
}
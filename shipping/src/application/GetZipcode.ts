import ZipcodeRepository from "../domain/repositories/ZipcodeRepository";

export default class GetZipcode {
  constructor(readonly zipcodeRepository: ZipcodeRepository) {
  }

  async execute(input: Input): Promise<Output> {
    const zipcode = await this.zipcodeRepository.getZipcode(input.code)
    return {
      state: zipcode.state,
      city: zipcode.city,
      coordinates: {
        lat: zipcode.coordinates.lat,
        lng: zipcode.coordinates.lng
      },
    }
  }
}

type Input = {
  code: string
}

type Output = {
  state: string,
  city: string,
  coordinates: {
    lat: number,
    lng: number
  }
}
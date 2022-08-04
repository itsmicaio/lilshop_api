import GetZipcode from "../../src/application/GetZipcode"
import AxiosGateway from "../../src/infra/gateway/AxiosGateway"
import BrasilApiHttpGateway from "../../src/infra/gateway/BrasilApiHttpGateway"
import ZipcodeGatewayRepository from "../../src/infra/repositories/ZipcodeGatewayRepository"

test("Deve trazer os dados do CEP", async function () {
  const brasilApiAxiosGateway = new AxiosGateway("https://brasilapi.com.br/api")
  const brasilApiGateway = new BrasilApiHttpGateway(brasilApiAxiosGateway)
  const zipcodeRepository = new ZipcodeGatewayRepository(brasilApiGateway)
  const getZipcode = new GetZipcode(zipcodeRepository)
  const output = await getZipcode.execute({code: "89010025"})
  expect(output.state).toBe("SC")
  expect(output.city).toBe("Blumenau")
  expect(output.coordinates.lat).toBe(-26.9248865)
  expect(output.coordinates.lng).toBe(-49.06122)
})
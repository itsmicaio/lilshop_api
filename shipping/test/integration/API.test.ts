import axios from 'axios'

test("Deve calcular o frete", async function () {
  const response = await axios({
    url: "http://localhost:3002/calculateShipping",
    method: 'post',
    data: {
      orderProducts: [
        { volume: 0.03, density: 100, quantity: 1 }
      ]
    }
  })
  const output = response.data
  expect(output.total).toBe(30)
})
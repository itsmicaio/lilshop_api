import OrderCode from "../../src/domain/entities/OrderCode"

test("Deve gerar o código do pedido", async function () {
  const date = new Date("2020-01-01T00:00:00")
  const sequence = 1
  const code = new OrderCode(date, sequence)
  expect(code.value).toBe("202000000001")
})
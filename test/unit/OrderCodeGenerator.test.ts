import OrderCodeGenerator from "../../src/domain/entities/OrderCodeGenarator"
import OrderRepositoryMemory from "../../src/infra/repositories/memory/OrderRepositoryMemory"

test("Deve gerar o código do pedido", async function () {
  const orderRepository = new OrderRepositoryMemory()
  const code = await OrderCodeGenerator.generate(orderRepository, new Date("2020-01-01T00:00:00"))
  expect(code).toBe("202000000002")
})
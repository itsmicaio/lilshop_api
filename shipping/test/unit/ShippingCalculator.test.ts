import ShippingCalculator from "../../src/domain/ShippingCalculator";

test("Deve calcular o valor do frete com a taxa minima", function () {
  const total = ShippingCalculator.calculate(0.003, 333)
  expect(total).toBe(10.0)
})

test("Deve calcular o valor do frete", function () {
  const total = ShippingCalculator.calculate(0.03, 100)
  expect(total).toBe(30.0)
})
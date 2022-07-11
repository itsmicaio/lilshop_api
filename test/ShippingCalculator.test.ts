import Dimension from "../src/Dimension";
import ShippingCalculator from "../src/ShippingCalculator";

test("Deve calcular o valor do frete com a taxa minima", function () {
  const shippingCalculator = new ShippingCalculator(new Dimension(20, 15, 10, 1), 1000)
  expect(shippingCalculator.calculate()).toBe(10.0)
})

const dimensions = [
  {shippingCalculator: new ShippingCalculator(new Dimension(100, 30, 10, 3), 1000), value: 30.0},
  {shippingCalculator: new ShippingCalculator(new Dimension(200, 100, 50, 40), 1000), value: 400.0}
]

test.each(dimensions)("Deve calcular o valor do frete", function ({shippingCalculator, value}) {
  expect(shippingCalculator.calculate()).toBe(value)
})
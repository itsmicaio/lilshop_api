import Dimension from "../../src/domain/entities/Dimension";
import Product from "../../src/domain/entities/Product";
import ShippingCalculator from "../../src/domain/entities/ShippingCalculator";

test("Deve calcular o valor do frete com a taxa minima", function () {
  const product = new Product(1, "Echo Dot", 100, new Dimension(20, 15, 10, 1))
  expect(ShippingCalculator.calculate(product)).toBe(10.0)
})

test("Deve calcular o valor do frete", function () {
  const product = new Product(4, "Gabinete Gamer", 100, new Dimension(100, 30, 10, 3))
  expect(ShippingCalculator.calculate(product)).toBe(30.0)
})
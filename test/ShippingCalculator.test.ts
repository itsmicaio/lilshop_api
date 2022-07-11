import Dimension from "../src/Dimension";
import OrderProduct from "../src/OrderProduct";
import ShippingCalculator from "../src/ShippingCalculator";

test("Deve calcular o valor do frete com a taxa minima", function () {
  const orderProduct = new OrderProduct(1, 100, new Dimension(20, 15, 10, 1), 1)
  const shippingCalculator = new ShippingCalculator([orderProduct], 1000)
  expect(shippingCalculator.calculate()).toBe(10.0)
})

test("Deve calcular o frete para vários produtos", function () {
  const orderProducts = [
    new OrderProduct(1, 100, new Dimension(100, 30, 10, 3), 2),
    new OrderProduct(1, 100, new Dimension(200, 100, 50, 40), 1)
  ]
  const shippingCalculator = new ShippingCalculator(orderProducts, 1000)
  expect(shippingCalculator.calculate()).toBe(460)
})
import Dimension from '../src/Dimension'
import Product from '../src/Product'

test("Deve criar um produto", function () {
  const product = new Product(
    1,
    "Echo Dot",
    199.99,
    new Dimension(200, 100, 50, 40)
  )

  expect(product).toBeDefined()
})
import Product from '../src/Product'

test("Deve criar um produto", function () {
  const product = new Product(
    1,
    "Echo Dot",
    199.99
  )

  expect(product).toBeDefined()
})
import Product from '../src/Product'

test("Deve criar um produto", function () {
  const product = new Product(
    1,
    "Curso Code Clean",
    199.99
  )

  expect(product).toBeDefined()
})
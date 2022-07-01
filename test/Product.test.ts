import Product from '../src/Product'

test("Deve criar um produto", function () {
  const product = new Product(
    "Curso Code Clean",
    "Código limpo de verdade",
    199.99
  )

  expect(product instanceof Product).toBe(true)
})
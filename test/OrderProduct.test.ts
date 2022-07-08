import Product from '../src/Product'
import OrderProduct from '../src/OrderProduct'

let product: Product;

beforeEach(function () {
  product = new Product(
    1,
    "Curso Code Clean",
    100
  )
})

test("Deve definir a quantidade de itens no pedido para 3", function () {
  const orderProduct = new OrderProduct(product, 1)
  expect(orderProduct.setQuantity(3)).toBe(true)
})

test("Deve definir a quantidade de itens no pedido para -3", function () {
  const orderProduct = new OrderProduct(product, 1)
  expect(orderProduct.setQuantity(-3)).toBe(false)
})

test("Deve calcular o valor total do produto no pedido", function () {
  const orderProduct = new OrderProduct(product, 1)

  expect(orderProduct.total()).toBe(100)
})

test("Deve criar calcular o valor total de 3x o produto no pedido", function () {
  const orderProduct = new OrderProduct(product, 3)

  expect(orderProduct.total()).toBe(300)
})
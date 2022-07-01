import Product from '../src/Product'
import OrderProduct from '../src/OrderProduct'

let product: Product;

beforeEach(function () {
  product = new Product(
    "Curso Code Clean",
    "Código limpo de verdade",
    100
  )
})

test("Deve definir a quantidade de itens no pedido para 3", function () {
  const orderProduct = new OrderProduct(product)
  expect(orderProduct.setQuantity(3)).toBe(true)
})

test("Deve definir a quantidade de itens no pedido para -3", function () {
  const orderProduct = new OrderProduct(product)
  expect(orderProduct.setQuantity(-3)).toBe(false)
})

test("Deve criar calcular o valor total do produto no pedido", function () {
  const orderProduct = new OrderProduct(product)

  expect(orderProduct.total()).toBe(100)
})

test("Deve criar calcular o valor total de 3x o produto no pedido", function () {
  const orderProduct = new OrderProduct(product)
  orderProduct.setQuantity(3)

  expect(orderProduct.total()).toBe(300)
})
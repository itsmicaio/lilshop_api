import Product from '../../src/domain/entities/Product'
import OrderProduct from '../../src/domain/entities/OrderProduct'

let product: Product;

beforeEach(function () {
  product = new Product(
    1,
    "Echo Dot",
    100
  )
})

test("Deve definir a quantidade de itens no pedido para 3", function () {
  const orderProduct = new OrderProduct(product.productId, product.price, 1)
  expect(orderProduct.setQuantity(3)).toBe(true)
})

test("Deve definir a quantidade de itens no pedido para -3", function () {
  const orderProduct = new OrderProduct(product.productId, product.price, 1)
  expect(() => orderProduct.setQuantity(-3)).toThrow("Invalid quantity")
})

test("Deve calcular o valor total do produto no pedido", function () {
  const orderProduct = new OrderProduct(product.productId, product.price, 1)

  expect(orderProduct.total()).toBe(100)
})

test("Deve criar calcular o valor total de 3x o produto no pedido", function () {
  const orderProduct = new OrderProduct(product.productId, product.price, 3)

  expect(orderProduct.total()).toBe(300)
})
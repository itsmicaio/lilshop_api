import Product from '../src/Product'
import Order from '../src/Order'
import Coupon from '../src/Coupon';
import Dimension from '../src/Dimension';

let product1: Product;
let product2: Product;
let product3: Product;
let validCpf: string;
let order: Order;
let dimension: Dimension;

beforeEach(function () {
  dimension = new Dimension(200, 100, 50, 40);

  product1 = new Product(
    1,
    "Airpods",
    299.99,
    dimension
  );

  product2 = new Product(
    2,
    "Echo Dot",
    199.99,
    dimension
  );

  product3 = new Product(
    3,
    "iPhone 12",
    99.99,
    dimension
  );

  validCpf = "143.402.457-12";
  order = new Order(validCpf);
})

test("Deve calcular o valor total de um pedido com 1 produto", function () {
  order.addProduct(product1, 1)

  expect(order.total()).toBe(299.99 + 400)
})

test("Deve calcular o valor total de um pedido com 3 produtos", function () {
  order.addProducts([
    { product: product1, quantity: 1 },
    { product: product2, quantity: 1 },
    { product: product3, quantity: 1 }
  ])

  expect(order.total()).toBe(599.97 + (400 * 3))
})

test("Deve criar calcular o valor total de 3x um produto no pedido", function () {
  order.addProducts([
    { product: product1, quantity: 3 },
    { product: product2, quantity: 1 },
    { product: product3, quantity: 1 }
  ])

  expect(order.total()).toBe(1199.95 + (400 * 5))
})

test("Deve criar um pedido com CPF inválido", function () {
  const invalidCpf = "444.568.126-99"

  expect(() => new Order(invalidCpf)).toThrow(new Error("Invalid CPF"))
})

test("Deve calcular um pedido com desconto de 3%", function () {
  order.addProduct(product1, 1)
  const coupon = new Coupon("ABC-3", 3, new Date())
  order.addCoupon(coupon)

  expect(order.total()).toBe(290.99 + 400)
})

test("Deve aplicar um cupom de desconto vencido", function() {
  const coupon = new Coupon("ABC-3", 3, new Date("2022-01-01T00:00:00"))
  expect(() => order.addCoupon(coupon)).toThrow("This coupon is expired")
})

test("Deve criar um pedido com quantidade negativa", function () {
  expect(() => order.addProduct(product1, -1)).toThrow("Invalid quantity")
})

test("Deve adicionar um produto já adicionado ao pedido", function () {
  order.addProducts([
    { product: product1, quantity: 1 },
    { product: product2, quantity: 1 },
    { product: product3, quantity: 1 }
  ])
  expect(() => order.addProduct(product2, 1)).toThrow("Product is already added")
})
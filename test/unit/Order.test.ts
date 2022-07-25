import Product from '../../src/domain/entities/Product'
import Order from '../../src/domain/entities/Order'
import Coupon from '../../src/domain/entities/Coupon';
import Dimension from '../../src/domain/entities/Dimension';

let product1: Product;
let product2: Product;
let product3: Product;
let validCpf: string;
let order: Order;

beforeEach(function () {
  product1 = new Product(
    1,
    "Airpods",
    299.99
  );

  product2 = new Product(
    2,
    "Echo Dot",
    199.99
  );

  product3 = new Product(
    3,
    "iPhone 12",
    99.99
  );

  validCpf = "143.402.457-12";
  order = new Order(validCpf);
})

test("Deve calcular o valor total de um pedido com 1 produto", function () {
  order.addProduct(product1, 1);
  expect(order.getTotal()).toBe(299.99);
})

test("Deve calcular o valor total de um pedido com 3 produtos", function () {
  order.addProducts([
    { product: product1, quantity: 1 },
    { product: product2, quantity: 1 },
    { product: product3, quantity: 1 }
  ]);
  expect(order.getTotal()).toBe(599.97);
})

test("Deve criar calcular o valor total de 3x um produto no pedido", function () {
  order.addProducts([
    { product: product1, quantity: 3 },
    { product: product2, quantity: 1 },
    { product: product3, quantity: 1 }
  ]);
  expect(order.getTotal()).toBe(1199.95);
})

test("Deve criar um pedido com CPF inválido", function () {
  expect(() => new Order("444.568.126-99")).toThrow(new Error("Invalid CPF"))
})

test("Deve calcular um pedido com desconto de 3%", function () {
  order = new Order(validCpf, new Date("2022-01-01T00:00:00") )
  order.addProduct(product1, 1);
  order.addCoupon(new Coupon("VALE3", 3, new Date()));
  expect(order.getTotal()).toBe(290.99);
})

test("Deve aplicar um cupom de desconto vencido", function() {
  const coupon = new Coupon("VALE3", 3, new Date("2022-01-01T00:00:00"));
  expect(() => order.addCoupon(coupon)).toThrow("This coupon is expired");
})

test("Deve calcular um pedido com frete", function () {
  const product = new Product(4, "Gabinete Gamer", 100, new Dimension(100, 30, 10, 3))
  order.addProduct(product, 2)
  expect(order.getTotal()).toBe(260)
})

test("Deve criar um pedido com quantidade negativa", function () {
  expect(() => order.addProduct(product1, -1)).toThrow("Invalid quantity");
})

test("Deve adicionar um produto repetido", function () {
  order.addProduct(product1, 1);
  expect(() => order.addProduct(product1, 1)).toThrow("Duplicated product");
})

test("Deve criar um pedido com código", function () {
  const order = new Order(validCpf, new Date("2020-01-01T00:00:00"), 1)
  expect(order.getCode()).toBe("2020000000001")
})
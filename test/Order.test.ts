import Product from '../src/Product'
import Order from '../src/Order'
import Cpf from '../src/Cpf';
import Coupom from '../src/Coupom';

let product1: Product;
let product2: Product;
let product3: Product;
let validCpf: string;
let order: Order;

beforeEach(function () {
  product1 = new Product(
    1,
    "Curso Code Clean",
    299.99
  );

  product2 = new Product(
    2,
    "Curso JavaScript Masterclass",
    199.99
  );

  product3 = new Product(
    3,
    "Curso JavaScript",
    99.99
  );

  validCpf = "143.402.457-12";
  order = new Order(validCpf);
})

test("Deve calcular o valor total de um pedido com 1 produto", function () {
  order.addProduct(product1, 1)

  expect(order.total()).toBe(299.99)
})

test("Deve calcular o valor total de um pedido com 3 produtos", function () {
  order.addProducts([
    { product: product1, quantity: 1 },
    { product: product2, quantity: 1 },
    { product: product3, quantity: 1 }
  ])

  expect(order.total()).toBe(599.97)
})

test("Deve criar calcular o valor total de 3x um produto no pedido", function () {
  order.addProducts([
    { product: product1, quantity: 3 },
    { product: product2, quantity: 1 },
    { product: product3, quantity: 1 }
  ])

  expect(order.total()).toBe(1199.95)
})

test("Deve criar um pedido com CPF inválido", function () {
  const invalidCpf = "444.568.126-99"

  expect(() => new Order(invalidCpf)).toThrow(new Error("Invalid CPF"))
})

test("Deve calcular um pedido com desconto de 3%", function () {
  order.addProduct(product1, 1)
  const coupom = new Coupom("ABC-3", 3)
  order.addCoupom(coupom)

  expect(order.total()).toBe(290.9903)
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
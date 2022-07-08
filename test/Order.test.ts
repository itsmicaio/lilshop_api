import Product from '../src/Product'
import Order from '../src/Order'
import Cpf from '../src/Cpf';
import Coupom from '../src/Coupom';

let product1: Product;
let product2: Product;
let product3: Product;
let validCpf: string;

beforeEach(function () {
  product1 = new Product(
    "Curso Code Clean",
    "Código limpo de verdade",
    299.99
  );

  product2 = new Product(
    "Curso JavaScript",
    "JS do básico ao avançado",
    199.99
  );

  product3 = new Product(
    "Curso JavaScript",
    "TS do básico ao avançado",
    99.99
  );

  validCpf = "143.402.457-12";
})

test("Deve calcular o valor total de um pedido com 1 produto", function () {
  const order = new Order(validCpf)
  order.addProduct(product1, 1)

  expect(order.total()).toBe(299.99)
})

test("Deve calcular o valor total de um pedido com 3 produtos", function () {
  const order = new Order(validCpf)
  order.addProducts([
    { product: product1, quantity: 1 },
    { product: product2, quantity: 1 },
    { product: product3, quantity: 1 }
  ])

  expect(order.total()).toBe(599.97)
})

test("Deve criar calcular o valor total de 3x um produto no pedido", function () {
  const order = new Order(validCpf)
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
  const order = new Order(validCpf)
  order.addProduct(product1, 1)
  const coupom = new Coupom("ABC-3", 3)
  order.addCoupom(coupom)

  expect(order.total()).toBe(290.9903)
})
import Coupom from "../src/Coupom";

test("Calcula o valor de um desconto de 10%", function () {
  const coupom = new Coupom("ABC-10", 10, new Date())
  expect(coupom.discountOf(100.00)).toBe(10.00);
})
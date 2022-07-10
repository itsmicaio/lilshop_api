import Coupon from "../src/Coupon";

test("Calcula o valor de um desconto de 10%", function () {
  const coupon = new Coupon("ABC-10", 10, new Date())
  expect(coupon.discountOf(100.00)).toBe(10.00);
})
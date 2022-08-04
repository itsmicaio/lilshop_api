import CheckCoupon from "../../src/application/CheckCoupon"
import PgPromiseAdapter from "../../src/infra/database/PgPromiseAdapter"
import CouponRepositoryDatabase from "../../src/infra/repositories/database/CouponRepositoryDatabase"

test("Deve checar a validade de um cupom valido", async function () {
  const connection = new PgPromiseAdapter()
  const couponRepository = new CouponRepositoryDatabase(connection)
  const checkCoupon = new CheckCoupon(couponRepository)
  const output = await checkCoupon.execute({
    code: "VALE20",
    date: new Date("2022-01-01T10:00:00")
  })
  connection.close()
  expect(output.valid).toBeTruthy()
})

test("Deve checar a validade de um cupom expirado", async function () {
  const connection = new PgPromiseAdapter()
  const couponRepository = new CouponRepositoryDatabase(connection)
  const checkCoupon = new CheckCoupon(couponRepository)
  const output = await checkCoupon.execute({
    code: "VALE20_EXPIRED"
  })
  connection.close()
  expect(output.valid).toBeFalsy()
})
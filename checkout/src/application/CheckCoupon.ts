import CouponRepository from "../domain/repositories/CouponRepository"

export default class CheckCoupon {
  constructor(readonly couponRepository: CouponRepository) {
  }

  async execute(input: Input): Promise<Output> {
    const coupon = await this.couponRepository.getCoupon(input.code)
    const expired = coupon.isExpired(input.date || new Date())
    return {
      discountPercentage: coupon.discountPercentage,
      valid: !expired
    }
  }
}

type Input = {
  code: string
  date?: Date
}

type Output = {
  discountPercentage: number,
  valid: boolean
}
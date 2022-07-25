import Coupon from "../entities/Coupon";

export default interface CouponRepository {
	getCoupon (couponCode: string): Promise<Coupon>;
}
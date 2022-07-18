import Coupon from "./Coupon";

export default interface CouponRepository {
	getCoupon (couponCode: string): Promise<Coupon>;
}
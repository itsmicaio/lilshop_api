import Coupon from "../../../domain/entities/Coupon";
import CouponRepository from "../../../domain/repositories/CouponRepository";

export default class CouponRepositoryMemory implements CouponRepository {
	coupons: Coupon[];

	constructor () {
		this.coupons = [
			new Coupon("VALE20", 20, new Date("2022-01-01T00:00:00")),
			new Coupon("VALE10", 10, new Date("2024-01-01T00:00:00"))
		];
	}

	async getCoupon(couponCode: string): Promise<Coupon> {
		const coupon = this.coupons.find(coupon => coupon.code === couponCode);
		if (!coupon) throw new Error("Coupon not found");
		return coupon;
	}
}
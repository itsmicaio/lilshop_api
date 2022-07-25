import OrderRepository from "../repositories/OrderRepository";

export default class OrderCodeGenerator {
  static SEQUENTIAL_LENGTH = 8;

  static async generate(orderRepository: OrderRepository, date: Date = new Date()) {
    const year = date.getFullYear()
    const count = await orderRepository.count() + 1
    return `${year}${count.toFixed().padStart(OrderCodeGenerator.SEQUENTIAL_LENGTH, "0")}`
  };
}
export default interface Gateway {
  baseUrl: string;

  call(path: string, method: string, data: any): Promise<Output>
}

export type Output = {
  success: boolean,
  status: number
  data: any
}
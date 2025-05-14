export interface IMockResponse<T> {
  status: number;
  message: string;
  data: T;
}

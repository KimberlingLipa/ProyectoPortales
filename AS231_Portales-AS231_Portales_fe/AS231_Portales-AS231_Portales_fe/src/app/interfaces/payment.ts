export interface Payment {
  id: string;
  workerId: string;
  paymentDate: Date | string;
  amount: number;
  active: boolean;
}

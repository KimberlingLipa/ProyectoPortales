import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Payment } from '../interfaces/payment';
import { PaymentModel } from '../models/payment-model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private url = "http://localhost:8080/api";

  constructor(private http: HttpClient) { }

  getPayments(): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${this.url}/payments`);
  }

  getDeactivatedPayments(): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${this.url}/payments/deactivated`);
  }

  getPaymentById(id: string): Observable<PaymentModel> {
    return this.http.get<PaymentModel>(`${this.url}/payments/${id}`);
  }

  getPaymentsByWorkerId(workerId: string): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${this.url}/payments/worker/${workerId}`);
  }

  postPayment(payment: PaymentModel): Observable<Object> {
    return this.http.post(`${this.url}/payments`, payment);
  }

  updatePayment(id: string, payment: PaymentModel): Observable<Object> {
    return this.http.put(`${this.url}/payments/${id}`, payment);
  }

  deactivatePayment(id: string): Observable<Object> {
    return this.http.patch(`${this.url}/payments/${id}/deactivate`, {});
  }

  restorePayment(id: string): Observable<Object> {
    return this.http.patch(`${this.url}/payments/${id}/restore`, {});
  }
}

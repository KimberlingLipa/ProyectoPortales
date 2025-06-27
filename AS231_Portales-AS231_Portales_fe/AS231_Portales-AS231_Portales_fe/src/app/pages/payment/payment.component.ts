import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Payment } from 'src/app/interfaces/payment';
import { PaymentService } from 'src/app/services/payment.service';
import { WorkerService } from 'src/app/services/worker.service';
import { Worker } from 'src/app/interfaces/worker';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  payments: Payment[] = [];
  filteredPayments: Payment[] = [];
  workers: Worker[] = [];

  constructor(
    private paymentService: PaymentService,
    private workerService: WorkerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getPayments();
    this.getWorkers();
  }

  getPayments(): void {
    this.paymentService.getPayments().subscribe((data) => {
      this.payments = data;
      this.filteredPayments = data;
      this.sortPayments();
    });
  }

  getWorkers(): void {
    this.workerService.getWorkers().subscribe((data) => {
      this.workers = data;
    });
  }

  sortPayments(): void {
    this.payments.sort((a, b) => {
      return a.id.localeCompare(b.id);
    });
  }

  normalizeText(text: string): string {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  filterPayments(event: Event): void {
    const searchTerm = this.normalizeText(
      (event.target as HTMLInputElement).value
    );
    this.filteredPayments = this.payments.filter(
      (payment) =>
        this.normalizeText(this.getWorkerPosition(payment.workerId)).includes(searchTerm)
    );
  }

  getWorkerPosition(workerId: string): string {
    const worker = this.workers.find(worker => worker.id === workerId);
    return worker ? worker.position : workerId;
  }

  updatePayment(id: string): void {
    this.router.navigate(['payments/update/', id]);
  }

  deletePayment(id: string): void {
    Swal.fire({
      title: '¿Está seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.paymentService.deactivatePayment(id).subscribe(() => {
          Swal.fire('¡Eliminado!', 'El pago ha sido eliminado.', 'success');
          this.getPayments();
        });
      }
    });
  }
}

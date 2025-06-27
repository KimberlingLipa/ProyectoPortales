import { Component, OnInit } from '@angular/core';
import { Payment } from 'src/app/interfaces/payment';
import { PaymentService } from 'src/app/services/payment.service';
import { WorkerService } from 'src/app/services/worker.service';
import { Worker } from 'src/app/interfaces/worker';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-payment-inactives',
  templateUrl: './payment-inactives.component.html',
  styleUrls: ['./payment-inactives.component.css'],
})
export class PaymentInactivesComponent implements OnInit {
  payments: Payment[] = [];
  filteredPayments: Payment[] = [];
  workers: Worker[] = [];

  constructor(
    private paymentService: PaymentService,
    private workerService: WorkerService
  ) {}

  ngOnInit(): void {
    this.getPayments();
    this.getWorkers();
  }

  getPayments(): void {
    this.paymentService.getDeactivatedPayments().subscribe((data) => {
      this.payments = data;
      this.filteredPayments = this.payments;
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

  restorePayment(id: string): void {
    Swal.fire({
      title: '¿Restaurar pago?',
      text: '¡El pago volverá a estar activo!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, restaurarlo!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.paymentService.restorePayment(id).subscribe(() => {
          Swal.fire(
            '¡Restaurado!',
            'El pago ha sido restaurado.',
            'success'
          );
          this.getPayments();
        });
      }
    });
  }
}

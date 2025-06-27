import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentModel } from 'src/app/models/payment-model';
import { PaymentService } from 'src/app/services/payment.service';
import { WorkerService } from 'src/app/services/worker.service';
import { Worker } from 'src/app/interfaces/worker';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-payment',
  templateUrl: './update-payment.component.html',
  styleUrls: ['./update-payment.component.css'],
})
export class UpdatePaymentComponent implements OnInit {
  id: string = '';
  payment: PaymentModel = new PaymentModel();
  paymentForm: FormGroup = new FormGroup({});
  workers: Worker[] = [];

  constructor(
    private paymentService: PaymentService,
    private workerService: WorkerService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.paymentService.getPaymentById(this.id).subscribe(
      (data) => {
        this.payment = data;
        this.setPaymentData();
      },
      (error) => {
        console.log(error);
      }
    );

    this.workerService.getWorkers().subscribe(
      (data) => {
        this.workers = data;
      },
      (error) => {
        console.log(error);
      }
    );

    this.paymentForm = this.fb.group({
      workerId: ['', Validators.required],
      paymentDate: ['', Validators.required],
      amount: ['', Validators.required],
      active: [true, Validators.required],
    });
  }

  setPaymentData(): void {
    // Formatear la fecha al formato yyyy-MM-dd
    const formattedDate = this.formatDate(this.payment.paymentDate);
    this.paymentForm.patchValue({
      workerId: this.payment.workerId,
      paymentDate: formattedDate,
      amount: this.payment.amount,
      active: this.payment.active,
    });
  }

  formatDate(date: Date | string | undefined): string {
    if (!date) return '';
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  onSubmit() {
    if (this.paymentForm?.valid) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: '¡Se actualizará el pago!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, actualizar!',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          const payment: PaymentModel = this.paymentForm.value;
          this.paymentService.updatePayment(this.id, payment).subscribe(
            (response) => {
              console.log('Payment updated: ', response);
              this.paymentForm.reset();
              Swal.fire(
                '¡Actualizado!',
                'El pago ha sido actualizado correctamente.',
                'success'
              );
              this.router.navigate(['/payments']);
            },
            (error) => {
              console.log(error);
              Swal.fire(
                'Error!',
                'Hubo un problema al actualizar el pago.',
                'error'
              );
            }
          );
        }
      });
    } else {
      Swal.fire(
        'Error!',
        'Por favor completa todos los campos requeridos.',
        'error'
      );
    }
  }

  onCancel() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡Se cancelará la actualización!',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cancelar!',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/payments']);
      }
    });
  }
}

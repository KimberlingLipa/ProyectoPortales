import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PaymentModel } from 'src/app/models/payment-model';
import { PaymentService } from 'src/app/services/payment.service';
import { WorkerService } from 'src/app/services/worker.service';
import { Worker } from 'src/app/interfaces/worker';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-payment',
  templateUrl: './add-payment.component.html',
  styleUrls: ['./add-payment.component.css'],
})
export class AddPaymentComponent implements OnInit {
  payment: PaymentModel = new PaymentModel();
  paymentForm: FormGroup = new FormGroup({});
  workers: Worker[] = [];

  constructor(
    private paymentService: PaymentService,
    private workerService: WorkerService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.paymentForm = this.fb.group({
      workerId: ['', Validators.required],
      paymentDate: ['', Validators.required],
      amount: ['', Validators.required],
      active: [true, Validators.required],
    });

    this.workerService.getWorkers().subscribe(
      (data) => {
        this.workers = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onSubmit() {
    if (this.paymentForm?.valid) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: '¡Se creará el pago!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, crear!',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          const payment: PaymentModel = this.paymentForm.value;
          this.paymentService.postPayment(payment).subscribe(
            (response) => {
              console.log('Payment created: ', response);
              this.paymentForm.reset();
              Swal.fire(
                '¡Creado!',
                'El pago ha sido creado correctamente.',
                'success'
              );
              this.router.navigate(['/payments']);
            },
            (error) => {
              console.log(error);
              Swal.fire(
                'Error!',
                'Hubo un problema al crear el pago.',
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

  onCancel(): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡Se cancelará la creación!',
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

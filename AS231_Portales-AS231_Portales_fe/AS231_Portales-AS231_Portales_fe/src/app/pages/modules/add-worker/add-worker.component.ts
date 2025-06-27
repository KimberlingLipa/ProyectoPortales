import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WorkerModel } from 'src/app/models/worker-model';
import { WorkerService } from 'src/app/services/worker.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-worker',
  templateUrl: './add-worker.component.html',
  styleUrls: ['./add-worker.component.css'],
})
export class AddWorkerComponent implements OnInit {
  worker: WorkerModel = new WorkerModel();
  workerForm: FormGroup = new FormGroup({});

  constructor(
    private workerService: WorkerService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.workerForm = this.fb.group({
      name: ['', Validators.required],
      position: ['', Validators.required],
      department: ['', Validators.required],
      active: [true, Validators.required],
    });
  }

  onSubmit() {
    if (this.workerForm?.valid) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: '¡Se creará el Puestos !',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, crear!',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          const worker: WorkerModel = this.workerForm.value;
          this.workerService.postWorker(worker).subscribe(
            (response) => {
              console.log('Worker created: ', response);
              this.workerForm.reset();
              Swal.fire(
                '¡Creado!',
                'El Puestos  ha sido creado correctamente.',
                'success'
              );
              this.router.navigate(['/workers']);
            },
            (error) => {
              console.log(error);
              Swal.fire(
                'Error!',
                'Hubo un problema al crear el Puestos .',
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
        this.router.navigate(['/workers']);
      }
    });
  }
}

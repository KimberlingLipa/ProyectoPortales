import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkerModel } from 'src/app/models/worker-model';
import { WorkerService } from 'src/app/services/worker.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-worker',
  templateUrl: './update-worker.component.html',
  styleUrls: ['./update-worker.component.css'],
})
export class UpdateWorkerComponent implements OnInit {
  id: string = '';
  worker: WorkerModel = new WorkerModel();
  workerForm: FormGroup = new FormGroup({});

  constructor(
    private workerService: WorkerService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.workerService.getWorkerById(this.id).subscribe(
      (data) => {
        this.worker = data;
        this.setWorkerData();
      },
      (error) => {
        console.log(error);
      }
    );

    this.workerForm = this.fb.group({
      name: ['', Validators.required],
      position: ['', Validators.required],
      department: ['', Validators.required],
      active: [true, Validators.required],
    });
  }

  setWorkerData(): void {
    this.workerForm.patchValue({
      name: this.worker.name,
      position: this.worker.position,
      department: this.worker.department,
      active: this.worker.active,
    });
  }

  onSubmit() {
    if (this.workerForm?.valid) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: '¡Se actualizará el Puestos!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, actualizar!',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          const worker: WorkerModel = this.workerForm.value;
          this.workerService.updateWorker(this.id, worker).subscribe(
            (response) => {
              console.log('Worker updated: ', response);
              this.workerForm.reset();
              Swal.fire(
                '¡Actualizado!',
                'El Puestos  ha sido actualizado correctamente.',
                'success'
              );
              this.router.navigate(['/workers']);
            },
            (error) => {
              console.log(error);
              Swal.fire(
                'Error!',
                'Hubo un problema al actualizar el Puestos .',
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
        this.router.navigate(['/workers']);
      }
    });
  }
}

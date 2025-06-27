import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SalaryModel } from 'src/app/models/salary-model';
import { SalaryService } from 'src/app/services/salary.service';
import { WorkerService } from 'src/app/services/worker.service';
import { Worker } from 'src/app/interfaces/worker';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-salary',
  templateUrl: './add-salary.component.html',
  styleUrls: ['./add-salary.component.css'],
})
export class AddSalaryComponent implements OnInit {
  salary: SalaryModel = new SalaryModel();
  salaryForm: FormGroup = new FormGroup({});
  workers: Worker[] = [];

  constructor(
    private salaryService: SalaryService,
    private workerService: WorkerService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.salaryForm = this.fb.group({
      workerId: ['', Validators.required],
      baseSalary: ['', Validators.required],
      bonus: ['', Validators.required],
      deductions: ['', Validators.required],
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
    if (this.salaryForm?.valid) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: '¡Se creará el salario!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, crear!',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          const salary: SalaryModel = this.salaryForm.value;
          this.salaryService.postSalary(salary).subscribe(
            (response) => {
              console.log('Salary created: ', response);
              this.salaryForm.reset();
              Swal.fire(
                '¡Creado!',
                'El salario ha sido creado correctamente.',
                'success'
              );
              this.router.navigate(['/salaries']);
            },
            (error) => {
              console.log(error);
              Swal.fire(
                'Error!',
                'Hubo un problema al crear el salario.',
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
        this.router.navigate(['/salaries']);
      }
    });
  }
}

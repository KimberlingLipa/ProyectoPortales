import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SalaryModel } from 'src/app/models/salary-model';
import { SalaryService } from 'src/app/services/salary.service';
import { WorkerService } from 'src/app/services/worker.service';
import { Worker } from 'src/app/interfaces/worker';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-salary',
  templateUrl: './update-salary.component.html',
  styleUrls: ['./update-salary.component.css'],
})
export class UpdateSalaryComponent implements OnInit {
  id: string = '';
  salary: SalaryModel = new SalaryModel();
  salaryForm: FormGroup = new FormGroup({});
  workers: Worker[] = [];

  constructor(
    private salaryService: SalaryService,
    private workerService: WorkerService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.salaryService.getSalaryById(this.id).subscribe(
      (data) => {
        this.salary = data;
        this.setSalaryData();
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

    this.salaryForm = this.fb.group({
      workerId: ['', Validators.required],
      baseSalary: ['', Validators.required],
      bonus: ['', Validators.required],
      deductions: ['', Validators.required],
      active: [true, Validators.required],
    });
  }

  setSalaryData(): void {
    this.salaryForm.patchValue({
      workerId: this.salary.workerId,
      baseSalary: this.salary.baseSalary,
      bonus: this.salary.bonus,
      deductions: this.salary.deductions,
      active: this.salary.active,
    });
  }

  onSubmit() {
    if (this.salaryForm?.valid) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: '¡Se actualizará el salario!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, actualizar!',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          const salary: SalaryModel = this.salaryForm.value;
          this.salaryService.updateSalary(this.id, salary).subscribe(
            (response) => {
              console.log('Salary updated: ', response);
              this.salaryForm.reset();
              Swal.fire(
                '¡Actualizado!',
                'El salario ha sido actualizado correctamente.',
                'success'
              );
              this.router.navigate(['/salaries']);
            },
            (error) => {
              console.log(error);
              Swal.fire(
                'Error!',
                'Hubo un problema al actualizar el salario.',
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
        this.router.navigate(['/salaries']);
      }
    });
  }
}

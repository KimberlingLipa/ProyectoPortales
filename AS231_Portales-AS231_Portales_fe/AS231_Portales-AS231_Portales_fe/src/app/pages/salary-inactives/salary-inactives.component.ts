import { Component, OnInit } from '@angular/core';
import { Salary } from 'src/app/interfaces/salary';
import { SalaryService } from 'src/app/services/salary.service';
import { WorkerService } from 'src/app/services/worker.service';
import { Worker } from 'src/app/interfaces/worker';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-salary-inactives',
  templateUrl: './salary-inactives.component.html',
  styleUrls: ['./salary-inactives.component.css'],
})
export class SalaryInactivesComponent implements OnInit {
  salaries: Salary[] = [];
  filteredSalaries: Salary[] = [];
  workers: Worker[] = [];

  constructor(
    private salaryService: SalaryService,
    private workerService: WorkerService
  ) {}

  ngOnInit(): void {
    this.getSalaries();
    this.getWorkers();
  }

  getSalaries(): void {
    this.salaryService.getDeactivatedSalaries().subscribe((data) => {
      this.salaries = data;
      this.filteredSalaries = this.salaries;
      this.sortSalaries();
    });
  }

  getWorkers(): void {
    this.workerService.getWorkers().subscribe((data) => {
      this.workers = data;
    });
  }

  sortSalaries(): void {
    this.salaries.sort((a, b) => {
      return a.id.localeCompare(b.id);
    });
  }

  normalizeText(text: string): string {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  filterSalaries(event: Event): void {
    const searchTerm = this.normalizeText(
      (event.target as HTMLInputElement).value
    );
    this.filteredSalaries = this.salaries.filter(
      (salary) =>
        this.normalizeText(this.getWorkerPosition(salary.workerId)).includes(searchTerm)
    );
  }

  getWorkerPosition(workerId: string): string {
    const worker = this.workers.find(worker => worker.id === workerId);
    return worker ? worker.position : workerId;
  }

  restoreSalary(id: string): void {
    Swal.fire({
      title: '¿Restaurar salario?',
      text: '¡El salario volverá a estar activo!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, restaurarlo!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.salaryService.restoreSalary(id).subscribe(() => {
          Swal.fire(
            '¡Restaurado!',
            'El salario ha sido restaurado.',
            'success'
          );
          this.getSalaries();
        });
      }
    });
  }
}

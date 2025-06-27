import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Salary } from 'src/app/interfaces/salary';
import { SalaryService } from 'src/app/services/salary.service';
import { WorkerService } from 'src/app/services/worker.service';
import { Worker } from 'src/app/interfaces/worker';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-salary',
  templateUrl: './salary.component.html',
  styleUrls: ['./salary.component.css'],
})
export class SalaryComponent implements OnInit {
  salaries: Salary[] = [];
  filteredSalaries: Salary[] = [];
  workers: Worker[] = [];

  constructor(
    private salaryService: SalaryService,
    private workerService: WorkerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getSalaries();
    this.getWorkers();
  }

  getSalaries(): void {
    this.salaryService.getSalaries().subscribe((data) => {
      this.salaries = data;
      this.filteredSalaries = data;
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

  updateSalary(id: string): void {
    this.router.navigate(['salaries/update/', id]);
  }

  deleteSalary(id: string): void {
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
        this.salaryService.deactivateSalary(id).subscribe(() => {
          Swal.fire('¡Eliminado!', 'El salario ha sido eliminado.', 'success');
          this.getSalaries();
        });
      }
    });
  }
}

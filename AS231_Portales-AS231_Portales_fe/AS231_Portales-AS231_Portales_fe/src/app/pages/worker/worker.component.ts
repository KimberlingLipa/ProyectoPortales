import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Worker } from 'src/app/interfaces/worker';
import { WorkerService } from 'src/app/services/worker.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-worker',
  templateUrl: './worker.component.html',
  styleUrls: ['./worker.component.css'],
})
export class WorkerComponent implements OnInit {
  workers: Worker[] = [];
  filteredWorkers: Worker[] = [];

  constructor(
    private workerService: WorkerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getWorkers();
  }

  getWorkers(): void {
    this.workerService.getWorkers().subscribe((data) => {
      this.workers = data;
      this.filteredWorkers = data;
      this.sortWorkers();
    });
  }

  sortWorkers(): void {
    this.workers.sort((a, b) => {
      return a.id.localeCompare(b.id);
    });
  }

  normalizeText(text: string): string {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  filterWorkers(event: Event): void {
    const searchTerm = this.normalizeText(
      (event.target as HTMLInputElement).value
    );
    this.filteredWorkers = this.workers.filter(
      (worker) =>
        this.normalizeText(worker.name).includes(searchTerm) ||
        this.normalizeText(worker.position).includes(searchTerm) ||
        this.normalizeText(worker.department).includes(searchTerm)
    );
  }

  updateWorker(id: string): void {
    this.router.navigate(['workers/update/', id]);
  }

  deleteWorker(id: string): void {
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
        this.workerService.deactivateWorker(id).subscribe(() => {
          Swal.fire('¡Eliminado!', 'El Puestos  ha sido eliminado.', 'success');
          this.getWorkers();
        });
      }
    });
  }
}

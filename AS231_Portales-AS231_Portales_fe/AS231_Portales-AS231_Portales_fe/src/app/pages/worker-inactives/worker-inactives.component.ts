import { Component, OnInit } from '@angular/core';
import { Worker } from 'src/app/interfaces/worker';
import { WorkerService } from 'src/app/services/worker.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-worker-inactives',
  templateUrl: './worker-inactives.component.html',
  styleUrls: ['./worker-inactives.component.css'],
})
export class WorkerInactivesComponent implements OnInit {
  workers: Worker[] = [];
  filteredWorkers: Worker[] = [];

  constructor(private workerService: WorkerService) {}

  ngOnInit(): void {
    this.getWorkers();
  }

  getWorkers(): void {
    this.workerService.getDeactivatedWorkers().subscribe((data) => {
      this.workers = data;
      this.filteredWorkers = this.workers;
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

  restoreWorker(id: string): void {
    Swal.fire({
      title: '¿Restaurar Puestos ?',
      text: '¡El Puestos  volverá a estar activo!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, restaurarlo!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.workerService.restoreWorker(id).subscribe(() => {
          Swal.fire(
            '¡Restaurado!',
            'El Puestos  ha sido restaurado.',
            'success'
          );
          this.getWorkers();
        });
      }
    });
  }
}

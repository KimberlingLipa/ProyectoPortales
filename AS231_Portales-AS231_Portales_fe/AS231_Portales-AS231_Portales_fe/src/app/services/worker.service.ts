import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Worker } from '../interfaces/worker';
import { WorkerModel } from '../models/worker-model';

@Injectable({
  providedIn: 'root'
})
export class WorkerService {

  private url = "http://localhost:8080/api";

  constructor(private http: HttpClient) { }

  getWorkers(): Observable<Worker[]> {
    return this.http.get<Worker[]>(`${this.url}/workers`);
  }

  getDeactivatedWorkers(): Observable<Worker[]> {
    return this.http.get<Worker[]>(`${this.url}/workers/deactivated`);
  }

  getWorkerById(id: string): Observable<WorkerModel> {
    return this.http.get<WorkerModel>(`${this.url}/workers/${id}`);
  }

  postWorker(worker: WorkerModel): Observable<Object> {
    return this.http.post(`${this.url}/workers`, worker);
  }

  updateWorker(id: string, worker: WorkerModel): Observable<Object> {
    return this.http.put(`${this.url}/workers/${id}`, worker);
  }

  deactivateWorker(id: string): Observable<Object> {
    return this.http.patch(`${this.url}/workers/${id}/deactivate`, {});
  }

  restoreWorker(id: string): Observable<Object> {
    return this.http.patch(`${this.url}/workers/${id}/restore`, {});
  }
}

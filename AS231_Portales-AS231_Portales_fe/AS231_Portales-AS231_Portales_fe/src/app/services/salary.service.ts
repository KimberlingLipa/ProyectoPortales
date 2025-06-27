import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Salary } from '../interfaces/salary';
import { SalaryModel } from '../models/salary-model';

@Injectable({
  providedIn: 'root'
})
export class SalaryService {

  private url = "http://localhost:8080/api";

  constructor(private http: HttpClient) { }

  getSalaries(): Observable<Salary[]> {
    return this.http.get<Salary[]>(`${this.url}/salaries`);
  }

  getDeactivatedSalaries(): Observable<Salary[]> {
    return this.http.get<Salary[]>(`${this.url}/salaries/deactivated`);
  }

  getSalaryById(id: string): Observable<SalaryModel> {
    return this.http.get<SalaryModel>(`${this.url}/salaries/${id}`);
  }

  getSalariesByWorkerId(workerId: string): Observable<Salary[]> {
    return this.http.get<Salary[]>(`${this.url}/salaries/worker/${workerId}`);
  }

  postSalary(salary: SalaryModel): Observable<Object> {
    return this.http.post(`${this.url}/salaries`, salary);
  }

  updateSalary(id: string, salary: SalaryModel): Observable<Object> {
    return this.http.put(`${this.url}/salaries/${id}`, salary);
  }

  deactivateSalary(id: string): Observable<Object> {
    return this.http.patch(`${this.url}/salaries/${id}/deactivate`, {});
  }

  restoreSalary(id: string): Observable<Object> {
    return this.http.patch(`${this.url}/salaries/${id}/restore`, {});
  }
}

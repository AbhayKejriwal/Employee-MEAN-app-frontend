import { inject, Injectable } from '@angular/core';
import Employee from './employee.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  backendUrl = 'http://localhost:3000/employee';
  httpClient = inject(HttpClient);
  constructor() { }

  getEmployees() {
    return this.httpClient.get<Employee[]>(this.backendUrl);
  }

  getEmployee(id: string) {
    return this.httpClient.get<Employee>(`${this.backendUrl}/${id}`);
  }

  addEmployee(employee: Employee) {
    return this.httpClient.post<Employee>(this.backendUrl, employee);
  }

  updateEmployee(employee: Employee) {
    return this.httpClient.put<Employee>(`${this.backendUrl}/${employee._id}`, employee);
  }

  deleteEmployee(id: string) {
    return this.httpClient.delete<Employee>(`${this.backendUrl}/${id}`);
  }
}

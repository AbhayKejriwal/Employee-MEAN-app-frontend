import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import Employee from '../employee.interface';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [CommonModule, RouterLink, MatButtonModule],
  templateUrl: './employees.component.html',
})
export class EmployeesComponent {
  employees: Employee[] = [];
  employeeService = inject(EmployeeService);

  ngOnInit() {
    this.employeeService
      .getEmployees()
      .subscribe((employees) => (this.employees = employees));
  }

  deleteEmployee(id: string) {
    const ok = confirm('Do you really want to delete this employee?');
    if (ok) {
      this.employeeService.deleteEmployee(id).subscribe(() => {
        this.employees = this.employees.filter(
          (employee) => employee._id !== id
        );
      });
    }
  }
}

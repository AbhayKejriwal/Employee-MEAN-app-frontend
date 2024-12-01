import { Routes } from '@angular/router';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';

export const routes: Routes = [
  {
    path: '',
    component: EmployeesComponent,
  },
  {
    path: 'employees',
    component: EmployeesComponent,
  },
  {
    path: 'employees/add',
    component: EmployeeFormComponent,
  },
  {
    path: 'employees/:id',
    component: EmployeeFormComponent,
  },
];

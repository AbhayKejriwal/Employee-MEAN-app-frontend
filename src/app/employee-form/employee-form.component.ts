import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EmployeeService } from '../employee.service';
import Employee from '../employee.interface';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [ RouterLink, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule ],
  templateUrl: './employee-form.component.html',
})
export class EmployeeFormComponent {
  formBuild = inject(FormBuilder);

  employeeForm: FormGroup = this.formBuild.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    department: ['', Validators.required],
    post: [''],
    salary: [''],
  });

  employeeService = inject(EmployeeService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  
  editEmployeeID!: string; // ID of the employee to edit
 
  ngOnInit() {
    this.editEmployeeID = this.route.snapshot.params['id'];
    if (this.editEmployeeID) {
      this.employeeService.getEmployee(this.editEmployeeID).subscribe((result) => {
          this.employeeForm.patchValue(result); //patchvalue will populate the value in the form
        });
    }
    console.log('id:', this.editEmployeeID);
  }
  addEmployee() {
    if (this.employeeForm.valid) {
      // Map form values to the Employee interface
      const model: Employee = {
        name: this.employeeForm.value.name as string,
        email: this.employeeForm.value.email as string,
        department: this.employeeForm.value.department as string,
        post: this.employeeForm.value.post as string | "",
        salary: this.employeeForm.value.salary ? Number(this.employeeForm.value.salary) : undefined
      };

      this.employeeService.addEmployee(model).subscribe({
        next: (result) => {
          console.log('Employee added successfully:', result);
          this.router.navigateByUrl('/');
        },
        error: (err) => {
          console.error('Error adding employee:', err);
          alert('Failed to add employee. Please fill all values and try again.');
        },
      });
    } else {
      alert('Invalid Input');
      console.log('Form is invalid');
    }
  }

  updateEmployee() {
    if (this.employeeForm.valid) {
      // Map form values to the Employee interface
      const model: Employee = {
        _id: this.editEmployeeID,
        name: this.employeeForm.value.name as string,
        email: this.employeeForm.value.email as string,
        department: this.employeeForm.value.department as string,
        post: this.employeeForm.value.post as string | undefined,
        salary: this.employeeForm.value.salary ? Number(this.employeeForm.value.salary) : undefined
      };

      this.employeeService.updateEmployee(model).subscribe({
        next: (result) => {
          console.log('Employee updated successfully:', result);
          this.router.navigateByUrl('/');
        },
        error: (err) => {
          console.error('Error updating employee:', err);
          alert('Failed to update employee details. Please fill all values and try again.');
        },
      });
    } else {
      alert('Invalid Input');
      console.log('Form is invalid');
    }
  }
}

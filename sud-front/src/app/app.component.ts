import { Component } from '@angular/core';
import { EmployeeService } from './services/employee.service';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <app-form
        (dataEvent)="receieveData($event)"
        [apptable]="apptable"
      ></app-form>
      <app-table
        [employees]="employees"
        #apptable
        (onDelete)="deletedEmployee($event)"
      ></app-table>
    </div>
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'sud-front';

  employees: any = [];

  constructor(private employeeService: EmployeeService) {}
  ngOnInit() {
    this.employeeService.getEmployees().subscribe((value) => {
      console.log(value);
      this.employees = value;
    });
  }

  receieveData(event: any) {
    console.log(event);
    this.employees.push(event);
  }

  deletedEmployee(empl: any) {


    const copyEmployees = this.employees.filter((employee:any) =>{
      console.log(empl.id);
      return employee.id !== empl.id;
    })


    this.employees = Object.assign([],copyEmployees);
  }

}

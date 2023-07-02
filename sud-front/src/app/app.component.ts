import { Component, OnInit } from '@angular/core';
import { EmployeeService } from './services/employee.service';



@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <app-form
        (dataEvent)="receieveData($event)"
        [apptable]="apptable"
      ></app-form>
      <ngx-charts-advanced-pie-chart
        [results]="totalNumOfEmployees"
        [view]="view"
        [scheme]="colorScheme"
      >
      </ngx-charts-advanced-pie-chart>
      <app-table
        [employees]="employees"
        #apptable
        (onDelete)="deletedEmployee($event)"
      ></app-table>
    </div>
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{
  title = 'sud-front';

  employees: any = [];
  totalNumOfEmployees:any = [

  ];

  single:any;


  view:any = [700, 400];

  colorScheme:any = {
    domain: ['#5AA454', '#A10A28']
  };


  constructor(private employeeService: EmployeeService) {
  }

  ngOnInit() {
    this.employeeService.getEmployees().subscribe((value) => {
      console.log(value);
      this.employees = value;
    });

    this.employeeService
      .getTotalNumberOfEmployeesByGender()
      .subscribe((value) => {
        this.totalNumOfEmployees = value;
        console.log(this.totalNumOfEmployees)
      });
  }

  receieveData(event: any) {
    console.log(event);
    this.employees.push(event);
  }

  deletedEmployee(empl: any) {
    const copyEmployees = this.employees.filter((employee: any) => {
      console.log(empl.id);
      return employee.id !== empl.id;
    });

    this.employees = Object.assign([], copyEmployees);
  }
}

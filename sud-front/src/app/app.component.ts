import { Component, OnInit } from '@angular/core';
import { EmployeeService } from './services/employee.service';



@Component({
  selector: 'app-root',
  template: `
    <mat-toolbar>
    <span>My Application</span>
  </mat-toolbar>
    <div class="container">
      <div class="mini-wrapper">
        <div style="width:50%">


      <ngx-charts-advanced-pie-chart
        [results]="totalNumOfEmployees"

        [scheme]="colorScheme"
        label="Ukupan broj zaposlenih"
      >
      </ngx-charts-advanced-pie-chart>
      </div>
      <app-form
        (dataEvent)="receieveData($event)"
        [apptable]="apptable"
      ></app-form>
      </div>

      <h4 style="margin-top:50px; margin-bottom:10px; font-weight:900px; font-size:16px;" class="mat-headline-6">Filtriraj po:</h4>

  <!-- <mat-form-field appearance="outline">
  <mat-label>Broju godina</mat-label>
  <input matInput (keyup)="applyFilter($any($event.target).value)" [(ngModel)]="testValue" />
  </mat-form-field>
  <mat-form-field appearance="outline" style='margin-left:20px'>
              <mat-label>Polu</mat-label>
              <mat-select formControlName="quallification" >
              <mat-option>-</mat-option>
                <mat-option
                value="Zensko">
                Musko
                </mat-option>
                <mat-option
                 value="Musko">
               Zensko
               </mat-option>
              </mat-select>
            </mat-form-field> -->


      <app-table
        [employees]="filteredEmployees"
        #apptable
        (onDelete)="deletedEmployee($event)"
      ></app-table>

      <app-table-employees-gender></app-table-employees-gender>
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


  view:any = [350, 350];

  colorScheme:any = {
    domain: ['#f794c5', '#3e92f7']
  };




  filteredEmployees: any = [];

  testValue:any;
  constructor(private employeeService: EmployeeService) {}
  ngOnInit() {
    this.employeeService.getEmployees().subscribe((value) => {
      this.employees = value;
      this.filteredEmployees = this.employees;
    });

    this.employeeService
      .getTotalNumberOfEmployeesByGender()
      .subscribe((value) => {
        this.totalNumOfEmployees = value;
      });
  }

  receieveData(event: any) {
    this.employees.push(event);
  }

  deletedEmployee(empl: any) {
    const copyEmployees = this.employees.filter((employee: any) => {
      return employee.id !== empl.id;
    });

    this.employees = Object.assign([], copyEmployees);
  }

  applyFilter(filterValue: string) {

    // this.employees.filter = filterValue.trim().toLowerCase();

    if(filterValue === ''){
      return this.filteredEmployees = this.employees;
    }

    this.filteredEmployees = this.employees.filter((data:any) => {
      // return data.firstName.trim().toLowerCase().includes(this.testValue.trim().toLowerCase()) &&  data.gender === "Мушко";
      return data.age === parseInt(this.testValue) &&  data.gender === "Мушко";
    });

    // this.employees.filter = Object.assign([],copy);
  }
}

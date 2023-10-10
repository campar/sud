import { Component } from "@angular/core";
import { EmployeeService } from "../services/employee.service";

@Component({
  selector: 'app-home',
  templateUrl:`home.component.html`,
})
export class HomeComponent {
  title = 'sud-front';

  employees: any = [];
  totalNumOfEmployees:any = [

  ];

  single:any;


  view:any = [350, 350];

  colorScheme:any = {
    domain: ['#3e92f7', '#f794c5']
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
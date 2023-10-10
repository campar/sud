
import { Component } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';


@Component({
  selector: 'app-table-employees-gender-position',
  template: `<table mat-table [dataSource]="employeesQuallification" class="table">
    <!-- Position Column -->
    <ng-container matColumnDef="quallification">
      <th mat-header-cell *matHeaderCellDef>Strucna Sprema</th>
      <td mat-cell *matCellDef="let ageStructure">
        {{ageStructure.name}}
       
      </td>
    </ng-container>
    <ng-container matColumnDef="total">
      <th mat-header-cell *matHeaderCellDef>Ukupno broj i procenat zaposlenih</th>
      <td mat-cell *matCellDef="let ageStructure">
      {{ ageStructure.total }} ({{ ageStructure.totalPercentage }}%)
      </td>
    </ng-container>
    <ng-container matColumnDef="male">
      <th mat-header-cell *matHeaderCellDef>Ukupno Muskaraca</th>
      <td mat-cell *matCellDef="let ageStructure">
      {{ ageStructure.male }} ({{ ageStructure.malePercentage }}%)
      </td>
    </ng-container>
    <ng-container matColumnDef="female">
      <th mat-header-cell *matHeaderCellDef>Ukupno Zena</th>
      <td mat-cell *matCellDef="let ageStructure">
      {{ ageStructure.female }} ({{ ageStructure.femalePercentage }}%)
      </td>
    </ng-container>

    <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
    <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
  </table>`,
})
export class QuallificationGenderComponent {
  employeesQuallification = [];
  displayedColumns: string[] = ['quallification', 'total', 'female', 'male'];

  constructor(private employeeService: EmployeeService) {}
  ngOnInit() {
    this.employeeService
      .getEmployeesGenderByQuallification()
      .subscribe((data: any) => {
        this.employeesQuallification = data;
      });
  }
}

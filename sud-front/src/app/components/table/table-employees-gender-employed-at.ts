
import { Component } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-table-employees-gender-employed-at',
  template: `<table mat-table [dataSource]="ageStructures" class="table">
    <!-- Position Column -->
    <ng-container matColumnDef="ageRange">
      <th mat-header-cell *matHeaderCellDef>Стросна Структура</th>
      <td mat-cell *matCellDef="let ageStructure">
        Od {{ ageStructure.ageRange }} година живота
      </td>
    </ng-container>
    <ng-container matColumnDef="total">
      <th mat-header-cell *matHeaderCellDef>Укупно</th>
      <td mat-cell *matCellDef="let ageStructure">
      {{ ageStructure.total }} ({{ ageStructure.totalPercentage }}%)
      </td>
    </ng-container>
    <ng-container matColumnDef="male">
      <th mat-header-cell *matHeaderCellDef>Мушкараца</th>
      <td mat-cell *matCellDef="let ageStructure">
      {{ ageStructure.male }} ({{ ageStructure.malePercentage }}%)
      </td>
    </ng-container>
    <ng-container matColumnDef="female">
      <th mat-header-cell *matHeaderCellDef>Жена</th>
      <td mat-cell *matCellDef="let ageStructure">
      {{ ageStructure.female }} ({{ ageStructure.femalePercentage }}%)
      </td>
    </ng-container>

    <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
    <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
  </table>`,
})
export class TableEmployeesGenderEmployedAtComponent {
  ageStructures = [];
  displayedColumns: string[] = ['ageRange', 'total', 'female', 'male'];

  constructor(private employeeService: EmployeeService) {}
  ngOnInit() {
    this.employeeService
      .getEmployeesGenderByAgeRange()
      .subscribe((data: any) => {
        this.ageStructures = data;
      });
  }
}

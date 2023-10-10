import { Component } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';


@Component({
  selector: 'app-table-employees-gender-position',
  template: `<table mat-table [dataSource]="employeesPosition" class="table">
    <!-- Position Column -->
    <ng-container matColumnDef="onPosition">
      <th mat-header-cell *matHeaderCellDef>Na poziciji</th>
      <td mat-cell *matCellDef="let ageStructure">
        <span *ngIf="ageStructure.onPosition;  else templateName ">
              Lica Na Polozajima
        </span>
        <ng-template #templateName>
           Lica na izvrsilackim radnim mestima
        </ng-template>
       
      </td>
    </ng-container>
    <ng-container matColumnDef="total">
      <th mat-header-cell *matHeaderCellDef>Ukupno</th>
      <td mat-cell *matCellDef="let ageStructure">
      {{ ageStructure.total }} ({{ ageStructure.totalPercentage }}%)
      </td>
    </ng-container>
    <ng-container matColumnDef="male">
      <th mat-header-cell *matHeaderCellDef>Muskaraca</th>
      <td mat-cell *matCellDef="let ageStructure">
      {{ ageStructure.male }} ({{ ageStructure.malePercentage }}%)
      </td>
    </ng-container>
    <ng-container matColumnDef="female">
      <th mat-header-cell *matHeaderCellDef>Zena</th>
      <td mat-cell *matCellDef="let ageStructure">
      {{ ageStructure.female }} ({{ ageStructure.femalePercentage }}%)
      </td>
    </ng-container>

    <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
    <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
  </table>`,
})
export class TableEmployeesGenderPositionComponent {
  employeesPosition = [];
  displayedColumns: string[] = ['onPosition', 'total', 'female', 'male'];

  constructor(private employeeService: EmployeeService) {}
  ngOnInit() {
    this.employeeService
      .getEmployeesGenderByPosition()
      .subscribe((data: any) => {
        this.employeesPosition = data;
      });
  }
}

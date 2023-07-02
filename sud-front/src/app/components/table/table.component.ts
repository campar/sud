import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-table',
  template: `
    <table mat-table [dataSource]="employees" class="table">
      <!-- Position Column -->
      <ng-container matColumnDef="jmbg">
        <th mat-header-cell *matHeaderCellDef>ЈМБГ</th>
        <td mat-cell *matCellDef="let employee">{{ employee.jmbg }}</td>
      </ng-container>

      <!-- Name Column -->
      <ng-container matColumnDef="firstName">
        <th mat-header-cell *matHeaderCellDef>Име</th>
        <td mat-cell *matCellDef="let employee" class="td-width">
          {{ employee.firstName }}
        </td>
      </ng-container>

      <!-- Weight Column -->
      <ng-container matColumnDef="lastName">
        <th mat-header-cell *matHeaderCellDef>Презиме</th>
        <td mat-cell *matCellDef="let employee" class="td-width">
          {{ employee.lastName }}
        </td>
      </ng-container>

      <!-- Symbol Column -->
      <ng-container matColumnDef="education">
        <th mat-header-cell *matHeaderCellDef>Образовање</th>
        <td mat-cell *matCellDef="let employee">
          {{ employee.quallification }}
        </td>
      </ng-container>

      <ng-container matColumnDef="gender">
        <th mat-header-cell *matHeaderCellDef>Пол</th>
        <td mat-cell *matCellDef="let employee">{{ employee.gender }}</td>
      </ng-container>

      <ng-container matColumnDef="dateOfBirth">
        <th mat-header-cell *matHeaderCellDef>Датум Рођења</th>
        <td mat-cell *matCellDef="let employee">{{ employee.dateOfBirth }}</td>
      </ng-container>

      <ng-container matColumnDef="del">
        <th mat-header-cell *matHeaderCellDef></th>
        <td mat-cell *matCellDef="let employee">
          <button
            mat-stroked-button
            color="warn"
            (click)="deleteRecord(employee)"
          >
            Obrisi
          </button>
        </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
    </table>
  `,
})
export class TableComponent {
  displayedColumns: string[] = [
    'jmbg',
    'firstName',
    'lastName',
    'education',
    'gender',
    'dateOfBirth',
    'del',
  ];

  @Input() employees: any;

  @Output() onDelete = new EventEmitter();

  @ViewChild(MatTable) table: any;

  constructor(private employeeService: EmployeeService) {}

  deleteRecord(empl: any) {
    this.onDelete.emit(empl);
    this.employeeService.deleteEmployee(empl.id).subscribe();


  }


}

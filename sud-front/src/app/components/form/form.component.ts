import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  template: `
    <div class="app-form">
      <form
        class="form"
        (ngSubmit)="onSubmit()"
        #documentEditForm="ngForm"
        [formGroup]="registerForm"
      >
        <div class="form-wrapper">
          <div class="row">
            <mat-form-field class="example-full-width">
              <mat-label>Име</mat-label>
              <input matInput formControlName="firstName" />
            </mat-form-field>
            <div class="gap"></div>
            <mat-form-field class="example-full-width">
              <mat-label>Презиме</mat-label>
              <input matInput formControlName="lastName" />
            </mat-form-field>
          </div>
          <div class="row">
            <mat-form-field class="example-full-width">
              <mat-label>ЈМБГ</mat-label>
              <input
                matInput
                maxlength="13"
                formControlName="jmbg"
                type="text"
                oninput="this.value=this.value.replace(/[^0-9]/g,'');"
              />
              <mat-hint>13 цифара</mat-hint>

            </mat-form-field>
            <div class="gap"></div>
            <mat-form-field>
              <mat-label>Стручна спрема</mat-label>
              <mat-select formControlName="quallification">
                <mat-option
                  *ngFor="let quallification of quallifications"
                  [value]="quallification.name"
                >
                  {{ quallification.name }}
                </mat-option>
              </mat-select>
            </mat-form-field>
          </div>


          <button mat-raised-button color="primary" type="submit">Креирај Запосленог</button>
        </div>
      </form>
    </div>
  `,
})
export class FormComponent implements OnInit{
  isSubmitted = false;

  @Output() dataEvent = new EventEmitter<any>();
  @Input("apptable") apptable:any;

  registerForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    jmbg: [''],
    quallification: [''],
  });

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService
  ) {}

  quallifications: any = [];

  ngOnInit() {
    this.employeeService.getAllQuallifications().subscribe((value) => {
      this.quallifications = value;
    });
  }
  onSubmit() {
    if (!this.registerForm.invalid) {
      {
        console.log(this.registerForm.value);

        this.employeeService
          .createEmployee(this.registerForm.value)
          .subscribe((data) => {
            console.log('POST Request is successful ', data);
            this.dataEvent.emit(data);
            this.apptable.table.renderRows()
          });

        this.registerForm.reset();
        this.isSubmitted = false;
      }
    } else {
      this.isSubmitted = true;
    }
  }
}

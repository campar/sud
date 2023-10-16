import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { FormBuilder, Validators } from '@angular/forms';
import { AbstractControl, ValidationErrors } from '@angular/forms';



import {
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';

export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY',
  },
  display: {
    dateInput: 'YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

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
          <div
            class="row"
            style="align-items:center; justify-content:space-between"
          >
            <section class="example-section" style="padding-bottom:22px;">
              <mat-checkbox class="example-margin" formControlName="onPosition"
                >Судија</mat-checkbox
              >
            </section>
            <div class="gap"></div>
            <mat-form-field class="example-full-width">
              <mat-label>Година запослења</mat-label>
              <input
                matInput
                type="number"
                formControlName="employedAt"
                [max]="currentYear"
                maxlength="4"
                oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
              />
            </mat-form-field>
          </div>
          <div class="row">
            <mat-form-field class="example-full-width">
              <mat-label>Име</mat-label>
              <input matInput formControlName="firstName"/>
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
             <mat-error *ngIf="form.jmbg?.errors?.['wrongChecksSum']">Неисправан ЈМБГ</mat-error>
             <mat-hint *ngIf="form.jmbg?.errors?.['minlength']">јмбг садржи 13 цифара</mat-hint>

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

          <button mat-raised-button color="primary" type="submit">
            Креирај Запосленог
          </button>
        </div>
      </form>
    </div>
  `,
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class FormComponent implements OnInit {
  isSubmitted = false;

  currentYear = new Date().getFullYear();

  @Output() dataEvent = new EventEmitter<any>();
  @Input('apptable') apptable: any;

  registerForm = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    jmbg: ['', [Validators.required, Validators.minLength(13), Validators.maxLength(13)]],
    quallification: ['', [Validators.required]],
    onPosition: [false],
    employedAt: [new Date().getFullYear(), [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService
  ) {}

  quallifications: any = [];

  get form() {
    return this.registerForm.controls;
  }
  

  ngOnInit() {
    this.employeeService.getAllQuallifications().subscribe((value) => {
      this.quallifications = value;
    });
  }
  onSubmit() {
    if (this.registerForm.valid) {
      this.employeeService
        .createEmployee(this.registerForm.value)
        .subscribe((data) => {
          console.log('POST Request is successful ', data);
          this.dataEvent.emit(data);
          this.apptable.table.renderRows();


          this.registerForm.reset({
            employedAt: new Date().getFullYear(),
            onPosition: false,
          });


          this.registerForm.markAsUntouched();

          this.isSubmitted = true;
          window.location.reload();

        });
    }
  }
}




// export function JmbgChecksum(control: AbstractControl): ValidationErrors | null {

//   if(!control.value){
//     return null;
//   }

//   const b1 = parseInt(control.value[0]);
//   const b2 = parseInt(control.value[1]);
//   const b3 = parseInt(control.value[2]);
//   const b4 = parseInt(control.value[3]);
//   const b5 = parseInt(control.value[4]);
//   const b6 = parseInt(control.value[5]);
//   const b7 = parseInt(control.value[6]);
//   const b8 = parseInt(control.value[7]);
//   const b9 = parseInt(control.value[8]);
//   const b10 = parseInt(control.value[9]);
//   const b11 = parseInt(control.value[10]);
//   const b12 = parseInt(control.value[11]);
//   const b13 = parseInt(control.value[12]); //this is checksum number

//   const m = 7 * (b1 + b7) + 6 * (b2 + b8) + 5 * (b3 + b9) + 4 * (b4 + b10) + 3 * (b5 + b11) + 2 * (b6 + b12);
//   const controlNumber = 11 - m % 11;

//   // If m is between 1 and 9, the number b13(checksum) is the same as the number m
//   // If m is 10 or 11 b13(checksum) becomes 0

//   if (controlNumber !== b13 && control.value.length === 13) {
//     return { wrongChecksSum: true };
//   }
//   return null;
// }



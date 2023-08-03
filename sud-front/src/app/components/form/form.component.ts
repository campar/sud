import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { FormBuilder, Validators } from '@angular/forms';


import {
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';

import * as moment from 'moment';


import { Moment } from "moment/moment.d"
import { MatDatepicker } from '@angular/material/datepicker';
import { map } from 'rxjs';

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
          <div class="row" style="align-items:center; justify-content:space-between">

          <section class="example-section" style="padding-bottom:22px;">
              <mat-checkbox class="example-margin" formControlName="onPosition"
                >Sudija</mat-checkbox
              >
            </section>
            <div class="gap"></div>
            <mat-form-field class="example-full-width">
            <mat-label>Godina zaposlenja</mat-label>
      <input matInput
        type="number"
       formControlName="date"
       [max]="currentYear"
       maxlength="4"
       oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);">
    </mat-form-field>
          </div>
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

          <button mat-raised-button color="primary" type="submit">
            Креирај Запосленог
          </button>
        </div>
      </form>
    </div>
  `,
    providers: [
      // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
      // application's root module. We provide it at the component level here, due to limitations of
      // our example generation script.
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
    firstName: [''],
    lastName: [''],
    jmbg: [''],
    quallification: [''],
    onPosition: [false],
    date:[new Date().getFullYear()]
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
        this.employeeService
          .createEmployee(this.registerForm.value).pipe(map((data) =>{
          }))
          .subscribe((data) => {
            console.log('POST Request is successful ', data);
            this.dataEvent.emit(data);
            this.apptable.table.renderRows();
          });

        this.registerForm.reset();
        this.isSubmitted = false;
      }
}

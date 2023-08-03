import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';


import {
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
// import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports

import * as moment from 'moment';


import { Moment } from "moment/moment.d"
// import * as moment from 'moment/moment.js';

import * as MomentD from "node_modules/moment/moment.d";



// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
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
  selector: 'app-year-datepicker',
  template: `
    <mat-form-field (click)="_openDatepickerOnClick(dp)" style="cursor:pointer">
    <mat-label style="cursor:pointer">Godina zaposlenja</mat-label>
  <input
    matInput
    [matDatepicker]="dp"
    formControlName="date"
    [max]="maxDate"
    [min]="minDate"
    readonly

    style="cursor:pointer"
    [matDatepickerFilter]="myDateFilter"

  />
  <mat-datepicker-toggle matSuffix [for]="dp"></mat-datepicker-toggle>
  <mat-datepicker
    #dp
    startView="multi-year"
    (yearSelected)="chosenYearHandler($event, dp)"
    panelClass="year-picker"

  >
  </mat-datepicker>
</mat-form-field>
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

export class YearDatepickerComponent  {

  // date = new FormControl(moment());
  maxDate = moment().add(8, 'years');
  minDate = moment().subtract(100, 'years');


  @Input('date') date: any;


  chosenYearHandler(normalizedYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value;
    ctrlValue?.year(normalizedYear.year());
    this.date.setValue(ctrlValue);

    // let d = new Date(this.date.value);

    // console.log(d.getFullYear());

    datepicker.close();
  }

  _openDatepickerOnClick(datepicker: MatDatepicker<Moment>) {
    if (!datepicker.opened) {
      datepicker.open();
    }
  }

  myDateFilter = (m: Moment | null): boolean => {
    const year = (m || moment()).year();
    return year <= new Date().getFullYear();
  };

}

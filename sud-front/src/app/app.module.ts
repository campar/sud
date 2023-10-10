import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSnackBarModule} from '@angular/material/snack-bar';



import { TableComponent } from './components/table/table.component';
import { FormComponent } from './components/form/form.component';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { ReactiveFormsModule } from '@angular/forms';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';

import {NgxChartsModule} from '@swimlane/ngx-charts';
import { FormsModule } from '@angular/forms';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { TableEmployeesGenderComponent } from './components/table/table-employees-gender.component';

import { HomeComponent } from './components/home.component';
import { TableEmployeesGenderPositionComponent } from './components/table/table-employees-gender-position';
import { QuallificationGenderComponent } from './components/table/quallification-gender';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TableEmployeesGenderEmployedAtComponent } from './components/table/table-employees-gender-employed-at';
import { BackendInterceptor } from './interceptor/backend.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    FormComponent,
    TableEmployeesGenderComponent,
    TableEmployeesGenderPositionComponent,
    QuallificationGenderComponent,
    HomeComponent,
    TableEmployeesGenderEmployedAtComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxChartsModule,
    FormsModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatMomentDateModule,
    MatDatepickerModule,
    MatPaginatorModule,
    MatSnackBarModule
  ],
  providers: [
    {
      provide: ErrorStateMatcher, 
      useClass: ShowOnDirtyErrorStateMatcher
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BackendInterceptor,
      multi: true,
      },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableEmployeesGenderComponent } from './components/table/table-employees-gender.component';
import { HomeComponent } from './components/home.component';
import { TableEmployeesGenderPositionComponent } from './components/table/table-employees-gender-position';
import { QuallificationGenderComponent } from './components/table/quallification-gender';



const routes: Routes = [
  { path: '', redirectTo: 'pocetna', pathMatch: 'full' },
  {path: 'pocetna' , component: HomeComponent},
  {path: 'starosna-struktura' , component: TableEmployeesGenderComponent},
  {path: 'strucna-sprema' , component: QuallificationGenderComponent},
  {path: 'pozicija-zaposlenih' , component: TableEmployeesGenderPositionComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

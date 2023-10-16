import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-root',
  template: `


    <mat-toolbar style="position:fixed; z-index:9999">
        <a [routerLink] = "'/'">Почетна</a>
        &nbsp;  &nbsp;
      <a [routerLink] = "'/starosna-struktura'">2)Старосна Структура </a>
      &nbsp;   &nbsp;
      <a [routerLink] = "'/strucna-sprema'">3)Стручна Спрема Запослених </a>
      &nbsp;   &nbsp;
      <a [routerLink] = "'/pozicija-zaposlenih'"> 4)Проценат Запослених По Позицији</a>


  </mat-toolbar>

    <div class="container">
    <router-outlet></router-outlet>
     
    </div>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

}

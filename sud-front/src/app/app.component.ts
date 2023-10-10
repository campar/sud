import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-root',
  template: `


    <mat-toolbar style="position:fixed; z-index:9999">
        <a [routerLink] = "'/'">Pocetna</a>
        &nbsp;  &nbsp;
      <a [routerLink] = "'/starosna-struktura'">2)Starosna Struktura </a>
      &nbsp;   &nbsp;
      <a [routerLink] = "'/strucna-sprema'">3)Strucna Sprema Zaposlenih </a>
      &nbsp;   &nbsp;
      <a [routerLink] = "'/pozicija-zaposlenih'"> 4)Procenat Zaposlenih Po Poziciji </a>


  </mat-toolbar>

    <div class="container">
    <router-outlet></router-outlet>
     
    </div>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

}

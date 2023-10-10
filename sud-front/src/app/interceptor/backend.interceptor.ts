import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar";
import { Observable, catchError, throwError } from "rxjs";

@Injectable()
export class BackendInterceptor implements HttpInterceptor{

  constructor(private _snackBar: MatSnackBar) {}

  
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(request).pipe(
        catchError((error:any) => {
          if(error.status === 409){
            this._snackBar.open('JMBG vec postoji u bazi','', {
              duration: 6000, 
              verticalPosition: 'top',
              horizontalPosition:'center'
            });
          }
          return throwError(() => error);
        })
      );
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

}
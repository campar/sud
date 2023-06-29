import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {}

  private API_URL = environment.baseURL;

  getEmployees() {
    return this.http
      .get<Employee[]>(this.API_URL + '/employee')
      .pipe(map((value: any) => value));
  }


  createEmployee(employee:any){
      return this.http.post(this.API_URL +'/employee', employee);
  }

  getAllQuallifications(){
    return this.http.get(this.API_URL +'/quallifications');
  }

  deleteEmployee(id:number){
      return this.http.delete(this.API_URL + `/employee/${id}`);
  }
}

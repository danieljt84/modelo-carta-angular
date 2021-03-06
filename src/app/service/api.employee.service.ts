import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiEmployeeService {

  private url: string = "https://employee-api-4p.herokuapp.com"
  constructor(private httpClient:HttpClient) { }

   getLikeName(name:string): Observable<any>{
    return  this.httpClient.get(this.url+"/employee/"+name);
  }
}

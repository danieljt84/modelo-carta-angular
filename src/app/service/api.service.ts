import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartaSimples } from '../model/CartaSimples';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private url: string = "https://modelo-carta-spring.herokuapp.com/"

  constructor(private http: HttpClient) { }

  downloadDocument(cartaSimples: CartaSimples) {
    return this.http.post(this.url, cartaSimples, {responseType: 'blob'})
  }
}

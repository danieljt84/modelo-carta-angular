import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartaSimples } from '../model/CartaSimples';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private urlPublic: string = "https://modelo-carta-spring.herokuapp.com/"
  private url: string = "http://localhost:8080/"

  constructor(private http: HttpClient) { }

  downloadDocument(cartaSimples: CartaSimples) {
    this.http.post(this.url, cartaSimples, {responseType: 'blob'}).subscribe(data => {
      const file = new Blob ([data], {
        type: "data"
      })
      const blob = window.URL.createObjectURL(file);
      const link = document.createElement('a');
      
      link.href = blob;
      link.download = "CARTA.docx"
      link.click();
      window.URL.revokeObjectURL(blob);
      link.remove();
   });
 }
}

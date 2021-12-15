import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartaSimples } from '../model/CartaSimples';
import * as FileSaver from 'file-saver';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private url: string = "http://localhost:8080/"

  constructor(private http: HttpClient) { }

  downloadDocument(cartaSimples: CartaSimples) {
    this.http.post(this.url, cartaSimples, {responseType: 'blob'}).subscribe(data => {
      FileSaver.saveAs(data, 'yourFilename.docx');
    });
  }
}

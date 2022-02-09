import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import { CartaSimples } from '../model/CartaSimples';
import { ApiService } from '../service/api.service';
import { Validators } from '@angular/forms';
import {formatDate} from '@angular/common';
import * as FileSaver from 'file-saver';


@Component({
  selector: 'app-filter-menu',
  templateUrl: './filter-menu.component.html',
  styleUrls: ['./filter-menu.component.css']
})
export class FilterMenuComponent implements OnInit {

  cartaSimples: CartaSimples;
  filter: FormGroup;
  dataHoje: string ;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService) {
    this.dataHoje = formatDate(new Date(), 'yyyy-MM-dd', 'en');
  }

  ngOnInit(): void {
    this.createForm(new CartaSimples());
  }

  createForm(cartaSimples: CartaSimples){
    this.filter = this.formBuilder.group({
      data: new FormControl(this.dataHoje,Validators.required),
      localLoja:new FormControl('',Validators.required),
      enderecoLoja:new FormControl('',Validators.required),
      nomePromotor:new FormControl('',Validators.required),
      cartPromotor:new FormControl('',Validators.required),
      serie:new FormControl('',[Validators.minLength(3),Validators.maxLength(4),Validators.required]),
      identidade:new FormControl(
        '',
        [Validators.maxLength(12),Validators.minLength(12),Validators.required]),
        nomeEmpresa: new FormControl('', Validators.required)
    });

  }

  getFormValidationErrors() {
    Object.keys(this.filter.controls).forEach(key => {

    const controlErrors: ValidationErrors = this.filter.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
          });
        }
      });
    }

  onSubmit(){
    const newCartaSimples = this.filter.getRawValue() as CartaSimples;
    this.apiService
    .downloadCarta(newCartaSimples,'cartasimples');
    this.createForm(new CartaSimples());
  }

}

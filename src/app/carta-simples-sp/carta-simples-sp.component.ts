import { formatDate } from '@angular/common';
import { Component, DoCheck, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CartaSimplesSp } from '../model/CartaSimplesSp';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-carta-simples-sp',
  templateUrl: './carta-simples-sp.component.html',
  styleUrls: ['./carta-simples-sp.component.css']
})
export class CartaSimplesSpComponent implements OnInit,DoCheck {

  cartaSimplesSp: CartaSimplesSp;
  filter: FormGroup;
  dataHoje: string;
  constructor(private formBuilder: FormBuilder, private apiService: ApiService) {
    this.dataHoje = formatDate(new Date(), 'yyyy-MM-dd', 'en');
  }
  ngDoCheck(): void {
    console.log("oi");
  }

  ngOnInit(): void {
    this.createForm(new CartaSimplesSp());
  }

  createForm(cartaSimples: CartaSimplesSp) {
    this.filter = this.formBuilder.group({
      data: new FormControl(this.dataHoje, Validators.required),
      localLoja: new FormControl('', Validators.required),
      enderecoLoja: new FormControl('', Validators.required),
      nomePromotor: new FormControl('', Validators.required),
      cartPromotor: new FormControl('', Validators.required),
      serie: new FormControl('',[Validators.minLength(3), Validators.maxLength(4), Validators.required]),
      identidade: new FormControl('',[Validators.maxLength(12), Validators.minLength(12), Validators.required]),
      nomeEmpresa: new FormControl('', Validators.required),
      cpf: new FormControl('', Validators.required),
      empresaContratante: new FormControl('', Validators.required)
    });
  }

  onSubmit(){
    const newCartaSimplesSp = this.filter.getRawValue() as CartaSimplesSp;
    this.apiService
    .downloadCarta(newCartaSimplesSp,"cartasimplessp");
    //this.createForm(new CartaSimplesSp());
  }

}

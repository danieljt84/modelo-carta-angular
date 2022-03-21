import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CartaAtacadao } from '../model/CartaAtacadao';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-carta-atacadao',
  templateUrl: './carta-atacadao.component.html',
  styleUrls: ['./carta-atacadao.component.css']
})
export class CartaAtacadaoComponent implements OnInit {
  cartaSimplesSp: CartaAtacadao;
  filter: FormGroup;
  dataHoje: string;
  constructor(private formBuilder: FormBuilder, private apiService: ApiService) {
    this.dataHoje = formatDate(new Date(), 'yyyy-MM-dd', 'en');
  }
  ngDoCheck(): void {
    console.log("oi");
  }

  ngOnInit(): void {
    this.createForm(new CartaAtacadao());
  }

  createForm(CartaAtacadao: CartaAtacadao) {
    this.filter = this.formBuilder.group({
      data: new FormControl(this.dataHoje, Validators.required),
      estado: new FormControl('', Validators.required),
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
    const newCartaAtacadao = this.filter.getRawValue() as CartaAtacadao;
    this.apiService
    .downloadCarta(newCartaAtacadao,"cartaatacadao");
   //this.createForm(new CartaAtacadao());
  }
}

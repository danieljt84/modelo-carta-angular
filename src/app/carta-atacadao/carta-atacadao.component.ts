import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CartaAtacadao } from '../model/CartaAtacadao';
import { ApiEmployeeService } from '../service/api.employee.service';
import { ApiService } from '../service/api.service';
import { debounceTime, tap, switchMap, finalize, distinctUntilChanged, filter } from 'rxjs/operators';
import { Employee } from '../model/Employee';


@Component({
  selector: 'app-carta-atacadao',
  templateUrl: './carta-atacadao.component.html',
  styleUrls: ['./carta-atacadao.component.css']
})
export class CartaAtacadaoComponent implements OnInit {
  cartaSimplesSp: CartaAtacadao;
  filter: FormGroup;
  dataHoje: string;
  isLoading = false;
  errorMsg!: string;
  filteredEmployees:Employee[] = [];
  employeerSelected: Employee;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService,
    private apiEmployeeService: ApiEmployeeService) {
    this.dataHoje = formatDate(new Date(), 'yyyy-MM-dd', 'en');
  }
 

  ngOnInit(): void {
    this.createForm(new CartaAtacadao());
    this.filter.get('nomePromotor').valueChanges.pipe(
      filter(res => {
        return res !== null && res.length >= 4
      }),
      distinctUntilChanged(),
        debounceTime(1000),
        tap(() => {
          this.errorMsg = "";
          this.filteredEmployees = [];
          this.isLoading = true;
        }),
        switchMap(value => this.apiEmployeeService.getLikeName(value as string)
          .pipe(
            finalize(() => {
              this.isLoading = false
            }),
          )
        )
    ).subscribe((data: any) => {
      if (data['statusText']) {
        this.errorMsg = data['statusText'];
        this.filteredEmployees = [];
      } else {
        this.errorMsg = "";
        this.filteredEmployees = data;
      }
      console.log(this.filteredEmployees);
    },
    (error)=> console.log(error));
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

  onSelected(employeeSelected:any){
    this.employeerSelected = employeeSelected;
    this.updateForm();
  }

  updateForm(){
    this.filter.get('cartPromotor').setValue(this.employeerSelected.numeroCtps);
    this.filter.get('serie').setValue(this.employeerSelected.serieCtps);
    this.filter.get('identidade').setValue(this.formatRg(this.employeerSelected.rg));
    this.filter.get('nomePromotor').setValue(this.employeerSelected.name);
    this.filter.get('cpf').setValue(this.formatCpf(this.employeerSelected.cpf));
    this.filter.get('nomeEmpresa').setValue(this.employeerSelected.empresa);

  }

  formatRg(rg:string):string{
    return rg.substring(0,2)+"."+rg.substring(2,5)+"."+rg.substring(5,8)+"-"+rg.charAt(8)
  }
  formatCpf(cpf:string):string{
    return cpf.substring(0,3)+"."+cpf.substring(3,6)+"."+cpf.substring(6,9)+"."+cpf.charAt(9)
  }
  getOptionText(option) {
    return option.name;
  }
}

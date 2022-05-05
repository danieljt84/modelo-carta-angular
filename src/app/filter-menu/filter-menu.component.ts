import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import { CartaSimples } from '../model/CartaSimples';
import { ApiService } from '../service/api.service';
import { Validators } from '@angular/forms';
import {formatDate} from '@angular/common';
import { debounceTime, tap, switchMap, finalize, distinctUntilChanged, filter } from 'rxjs/operators';
import * as FileSaver from 'file-saver';
import { Employee } from '../model/Employee';
import { ApiEmployeeService } from '../service/api.employee.service';


@Component({
  selector: 'app-filter-menu',
  templateUrl: './filter-menu.component.html',
  styleUrls: ['./filter-menu.component.css']
})
export class FilterMenuComponent implements OnInit {

  cartaSimples: CartaSimples;
  filter: FormGroup;
  dataHoje: string ;
  isLoading = false;
  errorMsg!: string;
  filteredEmployees:Employee[] = [];
  employeerSelected: Employee;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService,
    private apiEmployeeService: ApiEmployeeService) {
    this.dataHoje = formatDate(new Date(), 'yyyy-MM-dd', 'en');
  }

  ngOnInit(): void {
    this.createForm(new CartaSimples());
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
    //this.createForm(new CartaSimples());
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
  }

  formatRg(rg:string):string{
    return rg.substring(0,2)+"."+rg.substring(2,5)+"."+rg.substring(5,8)+"-"+rg.charAt(8)
  }

  getOptionText(option) {
    return option.name;
  }

}

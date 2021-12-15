import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IConfig } from 'ngx-mask';
import { FilterMenuComponent } from './filter-menu/filter-menu.component';

const routes: Routes = [
  { path:"", component: FilterMenuComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

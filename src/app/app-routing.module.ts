import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IConfig } from 'ngx-mask';
import { CartaSimplesSpComponent } from './carta-simples-sp/carta-simples-sp.component';
import { FilterMenuComponent } from './filter-menu/filter-menu.component';

const routes: Routes = [
  { path: '', redirectTo: '/cartasimples', pathMatch: 'full' },
  { path:"cartasimples", component: FilterMenuComponent },
  { path:"cartasimplessp", component : CartaSimplesSpComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

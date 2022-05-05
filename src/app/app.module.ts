import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FilterMenuComponent } from './filter-menu/filter-menu.component';
import { HttpClientModule } from '@angular/common/http';
import { VMessageComponent } from './vmessage/vmessage.component';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { CartaSimplesSpComponent } from './carta-simples-sp/carta-simples-sp.component';
import { CartaAtacadaoComponent } from './carta-atacadao/carta-atacadao.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    AppComponent,
    FilterMenuComponent,
    VMessageComponent,
    CartaSimplesSpComponent,
    CartaAtacadaoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatAutocompleteModule,    
    NgxMaskModule.forRoot({
      dropSpecialCharacters: false
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

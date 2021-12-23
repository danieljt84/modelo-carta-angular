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



@NgModule({
  declarations: [
    AppComponent,
    FilterMenuComponent,
    VMessageComponent,
    CartaSimplesSpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,    
    NgxMaskModule.forRoot({
      dropSpecialCharacters: false
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

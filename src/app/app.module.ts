import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {RegistroComponent} from "./registro/registro.component";
import {AppRoutingModule} from "./app.routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import {ToastModule} from "primeng/toast";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {HomeComponent} from "./paginas-usuario-logado/home/home.component";
import {ToolbarModule} from "primeng/toolbar";
import {TableModule} from "primeng/table";
import {TokenInterceptor} from "./services/interceptor/token.interceptor";
import {EditarUsuarioComponent} from "./paginas-usuario-logado/editar-usuario/editar-usuario.component";
import {DropdownModule} from "primeng/dropdown";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    HomeComponent,
    EditarUsuarioComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule,
    ToastModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToolbarModule,
    TableModule,
    DropdownModule
  ],
  providers: [HttpClient,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ToolbarModule} from "primeng/toolbar";
import {SplitButtonModule} from "primeng/splitbutton";
import { LoginComponent } from './pages/login/login.component';
import {InputTextModule} from "primeng/inputtext";
import {CardModule} from "primeng/card";
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {Interceptor} from "../utils/interceptor";
import {ReactiveFormsModule} from "@angular/forms";
import {UsuarioService} from "./services/usuario.service";
import { RegisterComponent } from './pages/register/register.component';
import {CalendarModule} from "primeng/calendar";
import {InputMaskModule} from "primeng/inputmask";
import { RegisterPessoaComponent } from './pages/register/register-pessoa/register-pessoa.component';
import {InputNumberModule} from "primeng/inputnumber";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    RegisterPessoaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ToolbarModule,
    SplitButtonModule,
    InputTextModule,
    CardModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    CalendarModule,
    InputMaskModule,
    InputNumberModule,
  ],
  providers: [
    UsuarioService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

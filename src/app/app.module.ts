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
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UsuarioService} from "./services/usuario.service";
import { RegisterComponent } from './pages/register/register.component';
import {CalendarModule} from "primeng/calendar";
import {InputMaskModule} from "primeng/inputmask";
import { RegisterPessoaComponent } from './pages/register/register-pessoa/register-pessoa.component';
import {InputNumberModule} from "primeng/inputnumber";
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import {NgOptimizedImage} from "@angular/common";
import {AvatarModule} from "primeng/avatar";
import { PanelAdmComponent } from './pages/panel-adm/panel-adm.component';
import { UserManagerComponent } from './pages/panel-adm/user-manager/user-manager.component';
import {MenuModule} from "primeng/menu";
import {SlideMenuModule} from "primeng/slidemenu";
import {PanelMenuModule} from "primeng/panelmenu";
import {SharedModule} from "./modules/shared.module";
import {TableModule} from "primeng/table";
import {PanelAdmModule} from "./pages/panel-adm/panel-adm.module";
import {DropdownModule} from "primeng/dropdown";
import {TagModule} from "primeng/tag";
import { RegisterEventComponent } from './pages/home/register-event/register-event.component';
import {DialogModule} from "primeng/dialog";
import {DividerModule} from "primeng/divider";
import {InputTextareaModule} from "primeng/inputtextarea";
import { DialogConfirmationComponent } from './components/dialog-confirmation/dialog-confirmation.component';
import {ProgressSpinnerModule} from "primeng/progressspinner";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    RegisterPessoaComponent,
    HomeComponent,
    HeaderComponent,
    PanelAdmComponent,
    UserManagerComponent,
    RegisterEventComponent,
    DialogConfirmationComponent
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
    NgOptimizedImage,
    AvatarModule,
    MenuModule,
    SlideMenuModule,
    PanelMenuModule,
    SharedModule,
    TableModule,
    PanelAdmModule,
    DropdownModule,
    TagModule,
    FormsModule,
    DialogModule,
    DividerModule,
    InputTextareaModule,
    ProgressSpinnerModule
  ],
  providers: [
    UsuarioService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    }
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

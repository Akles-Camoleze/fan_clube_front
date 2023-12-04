import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {RegisterPessoaComponent} from "./register/register-pessoa/register-pessoa.component";

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    children: [
      {
        path: '',
        redirectTo: 'user',
        pathMatch: "full"
      },
      {
        path: 'user',
        component: RegisterComponent
      },
      {
        path: 'personal-data',
        component: RegisterPessoaComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

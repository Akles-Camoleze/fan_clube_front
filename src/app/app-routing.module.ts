import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {RegisterComponent} from "./pages/register/register.component";
import {RegisterPessoaComponent} from "./pages/register/register-pessoa/register-pessoa.component";

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

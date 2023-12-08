import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {RegisterComponent} from "./pages/register/register.component";
import {RegisterPessoaComponent} from "./pages/register/register-pessoa/register-pessoa.component";
import {HomeComponent} from "./pages/home/home.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: "full"
  },
  {
    path: 'login',
    component: LoginComponent,
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
  },
  {
    path: 'home',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

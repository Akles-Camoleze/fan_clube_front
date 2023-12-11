import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {RegisterComponent} from "./pages/register/register.component";
import {RegisterPessoaComponent} from "./pages/register/register-pessoa/register-pessoa.component";
import {HomeComponent} from "./pages/home/home.component";
import {AuthGuard} from "./services/auth.service";

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
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'panel-adm',
    loadChildren: () => import('./pages/panel-adm/panel-adm.module').then(m => m.PanelAdmModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from "@angular/router";
import {StateService} from "./state.service";
import {Usuario} from "../entities/Usuario";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router,
    private stateService: StateService,
    private toastr: ToastrService
  ) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']).then((): void => {
        this.toastr.error('É necessário estar logado para prosseguir.', 'Erro');
      });
      return false;
    }
  }

  isLoggedIn(): boolean {
    return this.stateService.getItem<Usuario>('user') !== null;
  }
}

export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  return inject(AuthService).canActivate(next, state);
}

import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from "@angular/router";
import {StateService} from "./state.service";
import {Usuario} from "../entities/Usuario";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private router: Router,
    private stateService: StateService,
    private toastr: ToastrService
  ) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.isAdmin()) {
      return true;
    } else {
      this.router.navigate(['/home']).then((): void => {
        this.toastr.error('É necessário ser administrador para prosseguir.', 'Erro');
      });
      return false;
    }
  }

  isAdmin(): boolean {
    const usuario: Usuario | null = this.stateService.getItem<Usuario>('user');
    return usuario !== null && usuario.tipoUsuario.nome === "Administrador";
  }
}

export const AdminGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  return inject(AdminService).canActivate(next, state);
}

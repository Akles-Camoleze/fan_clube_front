import {AfterViewInit, Component, ElementRef, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {MenuItem} from "primeng/api";
import {StateService} from "../../services/state.service";
import {Usuario} from "../../entities/Usuario";
import {AdminService} from "../../services/admin.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements AfterViewInit, OnInit {
  model!: MenuItem[];
  usuarioLogged!: Usuario;

  constructor(
    private router: Router,
    private el: ElementRef,
    private stateService: StateService,
    private adminService: AdminService
  ) {
  }

  ngOnInit(): void {
    this.usuarioLogged = this.stateService.getItem<Usuario>('user')!;
    this.model = [
      {
        icon: 'pi pi-user',
        label: 'Dados Pessoais'
      },
      {
        icon: 'pi pi-sign-out',
        label: 'Sair',
        command: (): void => this.exit()
      }
    ];
    if (this.isAdmin()) {
      this.model.push({
        icon: 'pi pi-users',
        label: 'Painel Administrativo',
        command: () => this.router.navigate(['/panel-adm'])
      });
    }
  }

  ngAfterViewInit(): void {
    const splitButton = this.el.nativeElement.querySelector('.p-splitbutton-defaultbutton');
    if (splitButton) {
      splitButton.parentNode.removeChild(splitButton);
    }
  }

  goToHome(): void {
    this.router.navigate(['/home']);
  }

  exit(): void {
    this.stateService.removeItem('user');
    this.router.navigate(['/login']);
  }

  isAdmin(): boolean {
    return this.adminService.isAdmin();
  }
}

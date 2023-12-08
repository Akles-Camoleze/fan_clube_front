import {AfterViewInit, Component, ElementRef, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements AfterViewInit, OnInit {
  model!: MenuItem[];

  constructor(private router: Router, private el: ElementRef) {
  }

  ngOnInit(): void {
    this.model = [
      {
        icon: 'pi pi-user',
        label: 'Dados Pessoais'
      },
      {
        icon: 'pi pi-users',
        label: 'Gerenciar Adm.',
        command: () => this.router.navigate(['/panel-adm'])
      },
      {
        icon: 'pi pi-sign-out',
        label: 'Sair'
      }
    ];
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
}

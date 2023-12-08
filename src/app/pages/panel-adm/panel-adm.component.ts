import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-adm-manager',
  templateUrl: './panel-adm.component.html',
  styleUrls: ['./panel-adm.component.scss']
})
export class PanelAdmComponent implements OnInit {
  items: MenuItem[] = [];
  constructor() {
  }

  ngOnInit(): void {
    this.items = [
      {
        icon: 'pi pi-user',
        label: 'Dados Pessoais'
      },
      {
        icon: 'pi pi-users',
        label: 'Gerenciar Adm.',
      },
      {
        icon: 'pi pi-sign-out',
        label: 'Sair'
      }
    ];
  }

}

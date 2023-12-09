import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";
import {Router} from "@angular/router";

@Component({
  selector: 'app-adm-manager',
  templateUrl: './panel-adm.component.html',
  styleUrls: ['./panel-adm.component.scss']
})
export class PanelAdmComponent implements OnInit {
  items: MenuItem[] = [];
  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.items = [
      {
        icon: 'pi pi-users',
        label: 'Gerenciar Administradores'
      },
      {
        icon: 'pi pi-chart-bar',
        label: 'Relatórios',
        items: [
          {
            icon: 'pi pi-calendar',
            label: 'Eventos',
            command: () => this.router.navigateByUrl('/panel-adm/event-report')
          },
          {
            icon: 'pi pi-user',
            label: 'Pessoas',
            command: () => this.router.navigateByUrl('/panel-adm/person-report')
          }
        ]
      }
    ];
  }

}

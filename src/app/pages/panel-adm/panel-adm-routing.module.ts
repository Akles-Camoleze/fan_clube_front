import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdmManagerComponent} from "./adm-manager/adm-manager.component";
import {PanelAdmComponent} from "./panel-adm.component";
import {EventReportComponent} from "./event-report/event-report.component";
import {PersonReportComponent} from "./person-report/person-report.component";

const routes: Routes = [
  {
    path: '',
    component: PanelAdmComponent,
    children: [
      {
        path: '',
        redirectTo: 'manage-adm',
        pathMatch: 'full'
      },
      {
        path: 'manage-adm',
        component: AdmManagerComponent
      },
      {
        path: 'event-report',
        component: EventReportComponent
      },
      {
        path: 'person-report',
        component: PersonReportComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanelAdmRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserManagerComponent} from "./user-manager/user-manager.component";
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
        redirectTo: 'user-manager',
        pathMatch: 'full'
      },
      {
        path: 'user-manager',
        component: UserManagerComponent
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

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelAdmRoutingModule } from './panel-adm-routing.module';
import { EventReportComponent } from './event-report/event-report.component';
import {TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";
import {SharedModule} from "../../modules/shared.module";
import {InputTextModule} from "primeng/inputtext";
import {InputNumberModule} from "primeng/inputnumber";

@NgModule({
  declarations: [
    EventReportComponent
  ],
  imports: [
    CommonModule,
    PanelAdmRoutingModule,
    TableModule,
    ButtonModule,
    SharedModule,
    InputTextModule,
    InputNumberModule
  ]
})
export class PanelAdmModule { }

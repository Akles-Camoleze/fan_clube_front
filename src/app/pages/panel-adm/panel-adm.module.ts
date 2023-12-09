import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelAdmRoutingModule } from './panel-adm-routing.module';
import { EventReportComponent } from './event-report/event-report.component';
import {TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";
import {SharedModule} from "../../modules/shared.module";
import {InputTextModule} from "primeng/inputtext";
import {InputNumberModule} from "primeng/inputnumber";
import { PersonReportComponent } from './person-report/person-report.component';
import { EditUserComponent } from './user-manager/edit-user/edit-user.component';
import {DialogModule} from "primeng/dialog";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DropdownModule} from "primeng/dropdown";

@NgModule({
  declarations: [
    EventReportComponent,
    PersonReportComponent,
    EditUserComponent
  ],
  exports: [
    EditUserComponent
  ],
  imports: [
    CommonModule,
    PanelAdmRoutingModule,
    TableModule,
    ButtonModule,
    SharedModule,
    InputTextModule,
    InputNumberModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule
  ]
})
export class PanelAdmModule { }

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MonthNamePipe} from "../pipes/month-name.pipe";
import {DatePipe} from "../pipes/date.pipe";
import {RealValuePipe} from "../pipes/real-value.pipe";


@NgModule({
  declarations: [MonthNamePipe, DatePipe, RealValuePipe],
  imports: [
    CommonModule
  ],
  exports: [
    DatePipe,
    MonthNamePipe,
    RealValuePipe
  ]
})
export class SharedModule {
}

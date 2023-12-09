import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MonthNamePipe} from "../pipes/month-name.pipe";
import {DataPipe} from "../pipes/data.pipe";
import {RealValuePipe} from "../pipes/real-value.pipe";
import {PhoneNumberPipe} from "../pipes/phone-number.pipe";


@NgModule({
  declarations: [MonthNamePipe, DataPipe, RealValuePipe, PhoneNumberPipe],
  imports: [
    CommonModule
  ],
  exports: [
    DataPipe,
    MonthNamePipe,
    RealValuePipe,
    PhoneNumberPipe
  ]
})
export class SharedModule {
}

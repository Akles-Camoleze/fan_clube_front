import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'phoneNumber'
})
export class PhoneNumberPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) {
      return '';
    }
    const number: string = value.replace(/\D/g, '');
    return `(${number.slice(0, 2)}) ${number.slice(2, 7)}-${number.slice(7, number.length)}`;
  }

}

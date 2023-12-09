import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'realValue'
})
export class RealValuePipe implements PipeTransform {

  transform(value: number): string {
    if (isNaN(value)) {
      return '';
    }
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  }

}

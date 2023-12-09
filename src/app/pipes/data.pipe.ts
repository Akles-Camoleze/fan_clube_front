import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'data'
})
export class DataPipe implements PipeTransform {

  transform(value: Date | string): {data: string, hora: string} {
    if (typeof value === 'string') {
      value = new Date(value);
    }
    const formatoData: Intl.DateTimeFormat = new Intl.DateTimeFormat("pt-BR", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });

    const formatoHora: Intl.DateTimeFormat = new Intl.DateTimeFormat("pt-BR", {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: false,
    });

    const dataFormatada: string = formatoData.format(value);
    const horaFormatada: string = formatoHora.format(value);

    return {data: dataFormatada, hora: horaFormatada};
  }

}

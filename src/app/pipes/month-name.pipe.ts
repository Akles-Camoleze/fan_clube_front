import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'monthName'
})
export class MonthNamePipe implements PipeTransform {
  transform(monthNumber: number): string {
    const monthNames: Intl.DateTimeFormatPart[] = new Intl.DateTimeFormat('pt-BR', { month: 'long' })
      .formatToParts(new Date(2000, monthNumber - 1, 1));
    const monthName: string | undefined = monthNames.find((part: Intl.DateTimeFormatPart): boolean => part.type === 'month')?.value;
    return monthName!;
  }

}

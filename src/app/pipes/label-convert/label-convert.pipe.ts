import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'labelConvert',
})
export class LabelConvertPipe implements PipeTransform {
  transform(value: string): string {
    let result = value.replace(/([A-Z])/g, ' $1').trim();
    result = result.charAt(0).toUpperCase() + result.slice(1);
    return result;
  }
}

import { Pipe, PipeTransform, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToWords } from 'to-words';

@Pipe({
  name: 'numberToWords',
  standalone: true
})
export class NumberToWordsPipe implements PipeTransform {
  private translate = inject(TranslateService);

  transform(value: number): string {
    if (value == null) return '';

    const lang = this.translate.getCurrentLang();
    console.log('vao dat');
    

    const toWords = new ToWords({
      localeCode: lang === 'en' ? 'vi-VN' : 'en-US',
      converterOptions: {
        currency: false,
        ignoreDecimal: false,
      }
    });

    return toWords.convert(value);
  }
}

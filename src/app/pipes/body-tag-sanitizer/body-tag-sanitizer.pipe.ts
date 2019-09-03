import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bodyTagSanitizer'
})
export class BodyTagSanitizerPipe implements PipeTransform {

  transform(body: string): string {
    return body.replace(/<[^>]*>/g, '');
  }

}

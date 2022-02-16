import { Pipe, PipeTransform } from '@angular/core';
import { Sichapter } from './sichapter';
import { Sitask } from './sitask';

@Pipe({
    name: 'sichapterfilter',
    pure: false
})
export class SichapterFilter implements PipeTransform {
    transform(items: Sichapter[]): any {
        return items.filter(item => (
          item.chapterStatus!=''
        ));
    }
}

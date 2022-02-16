import { Pipe, PipeTransform } from '@angular/core';
import { Sitask } from './sitask';

@Pipe({
    name: 'sitaskfilter',
    pure: false
})
export class SitaskFilter implements PipeTransform {
    transform(items: Sitask[]): any {
        return items.filter(item => (
          item.taskStatus!=''
        ));
    }
}

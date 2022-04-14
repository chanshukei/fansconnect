import { Pipe, PipeTransform } from '@angular/core';
import { Event } from '../model/event';

@Pipe({
    name: 'eventfilter',
    pure: false
})
export class EventFilter implements PipeTransform {
    transform(items: Event[], filter: string): any {
        if (!items || !filter || filter=='all') {
            return items;
        }
        return items.filter(item => (
          item.eventDate.toString().startsWith(filter)
        ));
    }
}

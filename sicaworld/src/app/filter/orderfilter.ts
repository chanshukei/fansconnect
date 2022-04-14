import { Pipe, PipeTransform } from '@angular/core';
import { Order } from '../model/order';
import { OrderFilterArgs } from './orderfilterargs';

@Pipe({
    name: 'orderfilter',
    pure: false
})
export class OrderFilter implements PipeTransform {
    transform(items: Order[], filter: OrderFilterArgs): any {
        if (!items || !filter) {
            return items;
        }
        return items.filter(item => (
          item.createBy.indexOf(filter.createBy) !== -1
          && item.orderlines.filter(line => (
            line.itemName.indexOf(filter.itemName) !== -1
          )).length > 0
        ));
    }
}

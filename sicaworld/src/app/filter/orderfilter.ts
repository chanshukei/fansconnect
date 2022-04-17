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
        var idx = 0;
        return items.filter(item => {
          var startIdx = (filter.pageNo-1)*50;
          var endIdx = (filter.pageNo)*50-1;
          var isCurrentPage = (idx>=startIdx && idx<=endIdx);
          idx += 1;
          return (isCurrentPage 
          && item.createBy.indexOf(filter.createBy) !== -1
          && item.orderlines.filter(line => (
            line.itemName.indexOf(filter.itemName) !== -1
          )).length > 0);
        });
    }
}

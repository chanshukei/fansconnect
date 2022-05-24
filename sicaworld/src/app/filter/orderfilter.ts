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

        if(filter.createBy!='' || filter.itemName!=''){
          return items.filter(item => {
            return (
              item.createBy.indexOf(filter.createBy) !== -1
              && item.orderlines.filter(line => (
                line.itemName.indexOf(filter.itemName) !== -1
              )).length > 0
            );
          });
        }

        var idx = 0;
        return items.filter(item => {
          idx += 1;
          var startIdx = (filter.pageNo-1)*50;
          var endIdx = (filter.pageNo)*50-1;        
          return (idx>=startIdx && idx<=endIdx);
        });
    }
}

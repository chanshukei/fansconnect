import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from '../shop/order';
import { Orderline } from '../shop/orderline';
import { SupportitemService } from '../supportitem.service';
import { OrderFilterArgs } from './orderfilterargs';

@Component({
  selector: 'app-order-review',
  templateUrl: './order-review.component.html',
  styleUrls: ['./order-review.component.sass']
})
export class OrderReviewComponent implements OnInit {

  filterargs: OrderFilterArgs = {
    createBy: '',
    itemName: ''
  };

  orders: Order[] = [];
  orderlineSummary: Map<string, Orderline> = new Map();

  getSummaryArray(): Orderline[]{
    return Array.from(this.orderlineSummary.values());
  }

  listOrders(): void{
    this.itemService.getOrders(1).subscribe(
      e => {
        for(var i=0; i<e.length; i++){
          var e2: Order = {
            idolId: e[i].idolId,
            createBy: e[i].createBy,
            createDate: e[i].createDate,
            orderId: e[i].orderId,
            orderlines: [],
            fileContent: '',
            fileName: '',
            filePath: '',
            fileType: ''
          };
          this.listOrderlines(e2);
          this.orders.push(e2);
        };
      }
    );
  }

  listOrderlines(order: Order): void{
    order.orderlines = [];
    this.itemService.getOrderlines(order.orderId).subscribe(
      e => {
        for(var i=0; i<e.length; i++){
          var e2: Orderline = {
            lineId: e[i].lineId,
            price: e[i].price,
            itemCount: e[i].itemCount,
            totalAmount: e[i].totalAmount,
            itemId: e[i].itemId,
            itemName: e[i].itemName,
          };
          order.orderlines.push(e2);

          //init summary
          var summary:Orderline = this.orderlineSummary.get(e2.itemName)??{
            lineId: 0,
            price: 0,
            totalAmount: 0,
            itemId: e2.itemId,
            itemName: e2.itemName,
            itemCount: 0
          };
          //add new item
          if(!this.orderlineSummary.has(e2.itemName)){
            this.orderlineSummary.set(e2.itemName, summary);
          }
          //update count
          summary.totalAmount += e2.totalAmount;
          summary.itemCount += e2.itemCount;
        };
      }
    );
  }

  getTotalAmount(order: Order){
    var ta = 0;
    for(var i=0; i<order.orderlines.length; i++){
      ta += order.orderlines[i].totalAmount;
    }
    return ta;
  }

  constructor(
    private itemService: SupportitemService,
    private router: Router,
    private route: ActivatedRoute,
    private ngZone: NgZone
  ) {
    this.ngZone.run(()=>{
      var usernameEmail = window.sessionStorage.getItem("usernameEmail");
      var sessionId = window.sessionStorage.getItem("sessionId");
      if(usernameEmail!='' && sessionId!='' && usernameEmail!=null && sessionId!=null){
        this.router.navigate(['../orderReview'], {relativeTo: this.route});
      }else{
        this.router.navigate(['../login'], {relativeTo: this.route});
      }
    });
  }

  ngOnInit(): void {
    this.listOrders();
  }

}

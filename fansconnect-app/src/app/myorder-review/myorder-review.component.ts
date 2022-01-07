import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderFilterArgs } from '../order-review/orderfilterargs';
import { Order } from '../shop/order';
import { Orderline } from '../shop/orderline';
import { SupportitemService } from '../supportitem.service';

@Component({
  selector: 'app-myorder-review',
  templateUrl: './myorder-review.component.html',
  styleUrls: ['./myorder-review.component.sass']
})
export class MyorderReviewComponent implements OnInit {

  filterargs: OrderFilterArgs = {
    createBy: '',
    itemName: ''
  };

  isLoading: boolean = false;
  orders: Order[] = [];

  listOrders(): void{
    this.isLoading = true;
    this.itemService.getMyOrders(1).subscribe(
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

        this.isLoading = false;
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
        this.router.navigate(['../myorderReview'], {relativeTo: this.route});
      }else{
        this.router.navigate(['../login'], {relativeTo: this.route});
      }
    });
  }

  ngOnInit(): void {
    this.listOrders();
  }

  backToMenu(): void{
    this.router.navigate(['../home'], {relativeTo: this.route});
  }
}

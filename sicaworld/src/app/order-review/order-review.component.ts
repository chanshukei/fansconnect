import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from '../model/order';
import { Orderline } from '../model/orderline';
import { SupportitemService } from '../service/supportitem.service';
import { OrderFilterArgs } from '../filter/orderfilterargs';

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

  editingOrderline: Orderline = {
    lineId: -1,
    itemId: -1,
    price: 0,
    totalAmount: 0,
    itemCount: 0,
    itemName: ''
  };
  newItemCount: number = 0;
  newTotalAmount: number = 0;
  isShowImage: boolean = false;
  isLoading: boolean = false;
  orders: Order[] = [];
  orderlineSummary: Map<string, Orderline> = new Map();


  getSummaryArray(): Orderline[]{
    return Array.from(this.orderlineSummary.values());
  }

  listOrders(): void{
    this.isLoading = true;
    this.orders = [];
    this.orderlineSummary = new Map();
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
            fileType: '',
            remarks: e[i].remarks
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

  cancelEditOrderline():void{
    this.editingOrderline = {
      lineId: -1,
      itemId: -1,
      price: 0,
      totalAmount: 0,
      itemCount: 0,
      itemName: ''
    };
  }

  editOrderline(line: Orderline):void{
    this.editingOrderline = line;
    this.newItemCount = line.itemCount;
    this.newTotalAmount = line.totalAmount;
  }

  updateOrderline(): void{
    var newOrderline: Orderline = {
      lineId: this.editingOrderline.lineId,
      itemId: this.editingOrderline.itemId,
      itemName: this.editingOrderline.itemName,
      price: this.editingOrderline.price,
      itemCount: this.newItemCount,
      totalAmount: this.newTotalAmount
    }
    this.itemService.updateOrderline(newOrderline).subscribe(
      data => {
        window.alert("儲存成功");
        window.scrollTo(0, 0);
        this.editingOrderline = {
          lineId: -1,
          itemId: -1,
          price: 0,
          totalAmount: 0,
          itemCount: 0,
          itemName: ''
        };
        this.listOrders();
      }
    );
  }

  backToMenu(): void{
    this.router.navigate(['../home'], {relativeTo: this.route});
  }
}

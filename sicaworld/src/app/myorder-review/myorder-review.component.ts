import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderFilterArgs } from '../filter/orderfilterargs';
import { Order } from '../model/order';
import { Orderline } from '../model/orderline';
import { SupportitemService } from '../service/supportitem.service';

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

  isChanging: boolean = false;
  isLoading: boolean = false;
  orders: Order[] = [];
  editingOrders: Order[] = [];
  editingSize: number = 0;

  startChange(order:Order):void{
    if(confirm("你要更改訂單嗎?")){
      this.isChanging = true;
      this.editingOrders = [order];
    }
  }

  isChangingThis(orderId: string): boolean{
    if(this.editingOrders.length>0){
      if(this.editingOrders[0].orderId==orderId){
        return true;
      }
    }
    return false;
  }

  canChange(order:Order):boolean{
    if(!this.isChanging){
      for(var i=0; i<order.orderlines.length; i++){
        var ol = order.orderlines[i];
        if(ol.itemId>=6 && ol.itemId<=11){
          return true;
        }
      }
    }
    return false;
  }

  completeChange():void{
    this.isChanging = false;
    console.log('editingSize: '+this.editingSize);
    if(this.editingOrders.length>0){
      this.editingOrders[0].orderlines.forEach(ol =>{
        ol.itemId = this.editingSize;
      });
      this.itemService.modifyOrder(this.editingOrders[0]).subscribe(data => {
        alert("更改成功");
        this.listOrders();
      });
      console.log(this.editingOrders[0]);
    }
    this.editingOrders = [];
  }

  listOrders(): void{
    this.isLoading = true;
    this.orders = [];
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

  gotoProfile():void{
    this.router.navigate(['../profile'], {relativeTo: this.route});
  }

  backToMenu(): void{
    this.router.navigate(['../home'], {relativeTo: this.route});
  }
}

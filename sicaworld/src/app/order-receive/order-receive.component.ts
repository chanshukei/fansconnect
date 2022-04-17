import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from '../model/order';
import { Orderline } from '../model/orderline';
import { SupportitemService } from '../service/supportitem.service';
import { OrderFilterArgs } from '../filter/orderfilterargs';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { filter, max } from 'rxjs';

@Component({
  selector: 'app-order-receive',
  templateUrl: './order-receive.component.html',
  styleUrls: ['./order-receive.component.sass']
})
export class OrderReceiveComponent implements OnInit {

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
  isScan: boolean = false;
  qrCode: string = '';
  

  camerasNotFound(e: any){
    alert('Camera not found');
  }

  cameraFound(e: any){    
  }
  
  scanSuccessHandler(e: any){
    window.sessionStorage.setItem("qrCode", e);
    this.router.navigate(['../order-receive'], {relativeTo: this.route});    
  }
  cancelScan(){
    this.isScan = false;
  }
  scanComplete(){
    this.isScan = false;
  }

  startToScan(){
    this.isScan = true;
  }

  listOrders(qrCode: string): void{
    this.isLoading = true;
    this.orders = [];
    this.itemService.getOrdersByQrCode(this.qrCode).subscribe(
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
        }
        this.isLoading = false;
      }
    );
  }

  listOrderlines(order: Order): void{
    this.isLoading = true;
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
        }
        this.isLoading = false;
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
        this.qrCode = window.sessionStorage.getItem("qrCode")??"";
        this.router.navigate(['../order-receive'], {relativeTo: this.route});
      }else{
        this.router.navigate(['../login'], {relativeTo: this.route});
      }
    });
  }

  ngOnInit(): void {
    this.listOrders(this.qrCode);
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
        this.listOrders(this.qrCode);
      }
    );
  }

  backToMenu(): void{
    this.router.navigate(['../home'], {relativeTo: this.route});
  }
}
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
    this.isScan = false;
    this.isLoading = true;    
    this.qrCode = e;
    this.listOrders(this.qrCode);
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

  updateReceive(lineId: number, status: string){
    var newOrderline: Orderline = {
      lineId: lineId,
      itemId: 0,
      itemName: '',
      price: 0,
      itemCount: 0,
      totalAmount: 0,
      receiveStatus: status,
      receiveStatusDate: new Date()
    }
    this.itemService.updateReceiveStatus(newOrderline).subscribe(
      data => {
        window.alert("更新成功");
        window.scrollTo(0, 0);
        this.listOrders(this.qrCode);
      }
    );
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
            receiveStatus: e[i].receiveStatus,
            receiveStatusDate: e[i].receiveStatusDate
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

  backToMenu(): void{
    this.router.navigate(['../home'], {relativeTo: this.route});
  }
}
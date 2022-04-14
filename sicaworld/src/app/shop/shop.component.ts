import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IdolService } from '../idol.service';
import { Shopitem } from '../model/shopitem';
import { SupportitemService } from '../service/supportitem.service';
import { Order } from '../model/order';
import { Orderline } from '../model/orderline';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.sass']
})
export class ShopComponent implements OnInit {

  isLoading: boolean = false;

  editOrder: Order = {
    idolId: 1,
    orderId: '',
    fileContent: '',
    fileName: '',
    filePath: '',
    fileType: '',
    createDate: new Date(),
    createBy: '',
    orderlines: [],
    remarks: ''
  };

  pagemode: string = 'shop';
  items: Shopitem[] = [];
  orderlines: Orderline[] = [];
  isUploading: boolean = false;
  infoMessages: string[] = [];
  alertMessages: string[] = [];
  adminAccessRight: boolean = false;

  constructor(
    private idolService: IdolService,
    private itemService: SupportitemService,
    private router: Router,
    private route: ActivatedRoute,
    private ngZone: NgZone) {
      this.ngZone.run(()=>{
        var usernameEmail = window.sessionStorage.getItem("usernameEmail");
        var sessionId = window.sessionStorage.getItem("sessionId");
        this.loadAccessRight('admin');
        if(usernameEmail!='' && sessionId!='' && usernameEmail!=null && sessionId!=null){
          this.router.navigate(['../shop'], {relativeTo: this.route});
        }else{
          window.sessionStorage.setItem("redirectTo", "../shop");
          this.router.navigate(['../login'], {relativeTo: this.route});
        }
      });
    }

    loadAccessRight(roleId :string): void{
      this.idolService.checkAccessRight(1, roleId).subscribe(
        e => {
          this.adminAccessRight = e.length>0;
        }
      );
    }

    backToMyOrders(): void{
      this.router.navigate(['../myorderReview'], {relativeTo: this.route});
    }

    backToReview(): void{
      this.router.navigate(['../orderReview'], {relativeTo: this.route});
    }

    completeEdit(): void{
      this.alertMessages.length = 0;
      if(this.editOrder.fileContent.length==0){
        this.alertMessages.push("請提供圖片證明");
      }

      if(this.alertMessages.length>0){
        return;
      }

      var usernameEmail = window.sessionStorage.getItem("usernameEmail");
      this.infoMessages = ["付款中..."];
      this.isUploading = true;
      this.editOrder.createBy = usernameEmail??'';
      this.editOrder.orderlines = this.orderlines;
      this.itemService.addOrder(this.editOrder).subscribe(
        data => {
          this.reset();
          this.infoMessages = ["付款成功"];
          window.scrollTo(0, 0);
        }
      );
    }

    onFileSelected(event: Event): void{
      var fileList = (event.target as HTMLInputElement).files??new Array();
      if(fileList.length > 0){
        var file:File = fileList[0];
        if(file.size > 1024 * (1024 * 10)){
          this.alertMessages.push("上載檔案不可超過10MB");
          return;
        }

        this.editOrder.fileType = file.type;
        this.editOrder.fileName = file.name;

        var reader = new FileReader();
        reader.onload = () => {
          var result = reader.result as string;
          this.editOrder.fileContent = result.toString().split(',')[1]
        }
        reader.readAsDataURL(file)
      }
    }

    reset(): void{
      this.editOrder = {
        idolId: 1,
        orderId: '',
        fileContent: '',
        fileName: '',
        filePath: '',
        fileType: '',
        createDate: new Date(),
        createBy: '',
        orderlines: [],
        remarks: ''
      };
      this.orderlines = [];
      this.pagemode = "shop";
    }

    cancelEdit(): void{
      this.reset();
      this.pagemode = 'shop';
    }

    changeOrder(itemId: number, amt: number): void{
      this.changeOrderInternal(itemId, amt);
      console.log(this.orderlines);
    }

    pay(): void{
      this.pagemode = 'payment';
    }

    getTotalAmountText():string{
      var t = this.getTotalAmount();
      if(t==0){
        return "多多益Si";
      }
      return t.toString();
    }

    getTotalAmount():number{
      var total = 0;
      for(var i=0; i<this.orderlines.length; i++){
        total += this.orderlines[i].totalAmount;
      }
      return total;
    }

    changeOrderInternal(itemId: number, amt: number): void{
      for(var i=0; i<this.orderlines.length; i++){
        var l = this.orderlines[i];
        if(l.itemId==itemId){
          var amt2 = l.itemCount + amt;
          if(amt2<0){
            amt2 = 0;
          }
          l.itemCount = amt2;
          l.totalAmount = l.price * l.itemCount;
          return;
        }
      };

      //not found
      if(amt<0){
        return;
      }

      //add new
      for(var i=0; i<this.items.length; i++){
        var item = this.items[i];
        if(item.itemId==itemId){
          var ol: Orderline = {
            itemId: itemId,
            lineId: 0,
            price: item.price,
            totalAmount: 0,
            itemCount: amt,
            itemName: ''
          };
          ol.totalAmount = ol.price * ol.itemCount;
          this.orderlines.push(ol);
          return;
        }
      };
    }

    getOrderLineCount(itemId: number): number{
      for(var i=0; i<this.orderlines.length; i++){
        var l = this.orderlines[i];
        if(l.itemId==itemId){
          return l.itemCount;
        }
      };
      return 0;
    }

  ngOnInit(): void {
    this.listResult();
  }

  backToMenu(): void{
    this.router.navigate(['../home'], {relativeTo: this.route});
  }

  listResult():void{
    this.isLoading = true;

    this.itemService.getShopItems(1).subscribe(
      e => {
        for(var i=0; i<e.length; i++){
          var e2: Shopitem = {
            itemId: e[i].itemId,
            itemName: e[i].itemName,
            itemDescription: e[i].itemDescription,
            createDate: e[i].createDate,
            createBy: e[i].createBy,
            startDate: e[i].startDate,
            expiryDate: e[i].expiryDate,
            price: e[i].price,
            fileContent: e[i].fileContent,
            fileName: e[i].fileName,
            filePath: e[i].filePath,
            fileType: e[i].fileType,
            idolId: e[i].idolId
          };
          this.items.push(e2);
        };

        this.isLoading = false;
      }
    );
  }

}

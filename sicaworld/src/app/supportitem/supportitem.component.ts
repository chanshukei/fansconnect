import { Component, NgZone, OnInit } from '@angular/core';
import { SupportitemService } from '../service/supportitem.service';
import { SupportItem } from '../model/supportitem';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-supportitem',
  templateUrl: './supportitem.component.html',
  styleUrls: ['./supportitem.component.sass']
})
export class SupportitemComponent implements OnInit {

  isLoading: boolean = false;
  pagemode: string = 'list'
  alertMessage: string = ''
  verificationCode: string = ''
  supportItems: SupportItem[] = [];
  editSupportItem: SupportItem = {
    idolId: 1,
    itemId: 0,
    completeDate: new Date(),
    releaseDate: new Date(),
    releaseTime: '',
    itemName: '',
    itemDescription: '',
    supportType: '',
    incomeDate: new Date(),
    income: 0,
    paymentDate: new Date(),
    payment: 0,
    imageContent: '',
    fansCount: 0,
    itemCount: 0,
    releaseLocation: '',
    coord: ''
  };

  startEdit(item: SupportItem): void{
    this.editSupportItem = {
      idolId: item.idolId,
      itemId: item.itemId,
      completeDate: item.completeDate,
      releaseDate: item.releaseDate,
      releaseTime: item.releaseTime,
      itemName: item.itemName,
      itemDescription: item.itemDescription,
      supportType: item.supportType,
      incomeDate: item.incomeDate,
      income: item.income,
      paymentDate: item.paymentDate,
      payment: item.payment,
      imageContent: item.imageContent,
      fansCount: item.fansCount,
      itemCount: item.itemCount,
      releaseLocation: item.releaseLocation,
      coord: item.coord
    };

    this.pagemode = 'edit';
  }

  cancelEdit(): void{
    this.editSupportItem = {
      idolId: 1,
      itemId: 0,
      completeDate: new Date(),
      releaseDate: new Date(),
      releaseTime: '',
      itemName: '',
      itemDescription: '',
      supportType: '',
      incomeDate: new Date(),
      income: 0,
      paymentDate: new Date(),
      payment: 0,
      imageContent: '',
      fansCount: 0,
      itemCount: 0,
      releaseLocation: '',
      coord: ''
    };
    this.pagemode = 'list';
  }

  completeEdit(): void{
    console.log("completed edit item");
    this.itemService.saveItem(this.editSupportItem, this.verificationCode).subscribe(
      data => {
        console.log(data);
        this.alertMessage = '';
      },
      error => {
        console.error(error);
        this.alertMessage = "儲存失敗, 請檢查輸入的資料是否正確。";
      }
    );
  }

  constructor(
    private itemService: SupportitemService,
    private router: Router,
    private route: ActivatedRoute,
    private ngZone: NgZone) {
      this.ngZone.run(()=>{
        this.router.navigate(['../supportitem'], {relativeTo: this.route});
      });
    }

  backToHome(): void{
    this.router.navigate(['../home'], {relativeTo: this.route});
  }

  gotoMap(): void{
    this.router.navigate(['../map'], {relativeTo: this.route});
  }

  gotoLogin(): void{
    this.router.navigate(['../login'], {relativeTo: this.route});
  }

  addItem(): void{
    this.pagemode = 'edit';
    this.editSupportItem = {
      idolId: 1,
      itemId: 0,
      completeDate: new Date(),
      releaseDate: new Date(),
      releaseTime: '',
      itemName: '',
      itemDescription: '',
      supportType: '',
      incomeDate: new Date(),
      income: 0,
      paymentDate: new Date(),
      payment: 0,
      imageContent: '',
      fansCount: 0,
      itemCount: 0,
      releaseLocation: '',
      coord: ''
    };
  }

  ngOnInit(): void {
    console.log("items init");
    this.verificationCode = window.sessionStorage.getItem("verificationCode")??"";
    console.log("verification code:"+this.verificationCode);
    this.listResult();
  }

  listResult(): void{
    this.isLoading = true;
    this.itemService.getItems(1).subscribe(
      e => {
        console.log(e);
        for(var i=0; i<e.length; i++){
          if(this.verificationCode==''){
            var today = new Date();
            var releaseDateObj = new Date(e[i].releaseDate);
            if(releaseDateObj.getTime()>today.getTime()){
              continue;
            }
          }
          var e2: SupportItem = {
            itemId: e[i].itemId,
            itemName: e[i].itemName,
            itemDescription: e[i].itemDescription,
            completeDate: e[i].completeDate,
            releaseDate: e[i].releaseDate,
            releaseTime: e[i].releaseTime,
            releaseLocation: e[i].releaseLocation,
            incomeDate: e[i].incomeDate,
            income: e[i].income,
            paymentDate: e[i].paymentDate,
            payment: e[i].payment,
            idolId: e[i].idolId,
            fansCount: e[i].fansCount,
            itemCount: e[i].itemCount,
            imageContent: '',
            supportType: e[i].supportType,
            coord: e[i].coord
          };
          this.supportItems.push(e2);
        };
        this.isLoading = false;
      }
    );
  }

}

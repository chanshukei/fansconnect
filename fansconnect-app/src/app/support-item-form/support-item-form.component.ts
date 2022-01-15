import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../event.service';
import { SupportItemForm } from './support-item-form';

@Component({
  selector: 'app-support-item-form',
  templateUrl: './support-item-form.component.html',
  styleUrls: ['./support-item-form.component.sass']
})
export class SupportItemFormComponent implements OnInit {

  currentTab: string = 'form';
  isComplete: boolean = false;
  infoMessages: string[] = [];
  alertMessages: string[] = [];
  editForm: SupportItemForm = {
    formId: 0,
    itemName: '',
    answer1: '',
    idolId: 1,
    supportPeriod: '',
    releaseLocation: '',
    isPaid: 'N',
    supportType: '',
    contactNo: '',
    createDate: new Date(),
  };

  constructor(
    private eventService: EventService,
    private router: Router,
    private route: ActivatedRoute,
    private ngZone: NgZone) {
      this.ngZone.run(()=>{
        this.router.navigate(['../support-item-form'], {relativeTo: this.route});
      });
    }

  backToMenu(): void{
    this.router.navigate(['../home'], {relativeTo: this.route});
  }

  getNavItemClass(tab: string):string{
    if(this.currentTab==tab){
      return 'nav-link-active disabled';
    }else{
      return 'nav-link';
    }
  }

  changeTab(ftype: string):void{

  }

  updateIsPaid(isPaid: string):void{
    this.editForm.isPaid = isPaid;
  }

  completeEdit(): void{
    this.alertMessages.length = 0;
    if(this.editForm.itemName==''){
      this.alertMessages.push("請輸入貴公司名稱");
    }
    if(this.editForm.releaseLocation==''){
      this.alertMessages.push("請輸入貴公司地址");
    }
    if(this.editForm.contactNo==''){
      this.alertMessages.push("請輸入閣下Signal / Whatsapp聯絡電話");
    }
    if(this.editForm.supportType==''){
      this.alertMessages.push("請輸入貴公司店鋪類型");
    }
    if(this.editForm.supportType==''){
      this.alertMessages.push("請輸入應援物擺放時間");
    }

    if(this.alertMessages.length>0){
      return;
    }

    this.eventService.addSupportItemForm(this.editForm).subscribe(
      data => {
        this.isComplete = true;
        this.infoMessages = ["成功提交表格, 多謝參與。"]
        window.scrollTo(0, 0);
      }
    );
  }

  cancelEdit(): void{
    this.reset();
  }

  reset(): void{
    this.editForm = {
      formId: 0,
      itemName: '',
      answer1: '',
      idolId: 1,
      supportPeriod: '',
      releaseLocation: '',
      isPaid: 'N',
      supportType: '',
      contactNo: '',
      createDate: new Date(),
    };
  }

  ngOnInit(): void {
  }

}

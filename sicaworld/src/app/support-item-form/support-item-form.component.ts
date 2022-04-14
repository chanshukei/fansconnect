import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../service/event.service';
import { Income } from '../model/income';
import { SupportItemForm } from './support-item-form';

@Component({
  selector: 'app-support-item-form',
  templateUrl: './support-item-form.component.html',
  styleUrls: ['./support-item-form.component.sass']
})
export class SupportItemFormComponent implements OnInit {

  total: number = 0;
  incomeSummarys: Income[] = [];
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
    private ngZone: NgZone
  ) {
    this.ngZone.run(()=>{
      this.router.navigate(['../support-item-form'], {relativeTo: this.route});
    });
  }

  listIncomeResult(): void{
    this.eventService.getIncomes(1).subscribe(
      e => {
        var incomes: Income[] = [];
        for(var i=0; i<e.length; i++){
          var e2: Income = {
            idolId: e[i].idolId,
            incomeId: e[i].incomeId,
            payeeName: '',
            tgId: '',
            amount: e[i].amount,
            createDate: e[i].createDate,
            imageContent: '',
            answer1: e[i].answer1,
            answer2: e[i].answer2,
            answer3: e[i].answer3,
            answer4: e[i].answer4,
            answer5: e[i].answer5
          };
          this.total += e2.amount;
          incomes.push(e2);
        };

        //sumary
        this.createSummary(incomes);

      }
    );
  }

  createSummary(incomes: Income[]): void{
    var amount2 = 0;
    var date2 = new Date('1900-01-01');
    for(var i=0; i<incomes.length; i++){
      if(incomes[i].createDate == date2){
        amount2 += incomes[i].amount;
      }else{
        if(amount2>0){
          var income1: Income = {
            incomeId:0,
            amount: amount2,
            createDate: date2,
            tgId: '', payeeName: '',
            imageContent: '',
            answer1: '', answer2: '', answer3: '', answer4: '', answer5: '',
            idolId: 0
          };
          this.incomeSummarys.push(income1);
        }
        date2 = incomes[i].createDate;
        amount2 = incomes[i].amount;
      }
    }

    if(amount2>0){
      var income1: Income = {
        incomeId:0,
        amount: amount2,
        createDate: date2,
        tgId: '', payeeName: '',
        imageContent: '',
        answer1: '', answer2: '', answer3: '', answer4: '', answer5: '',
        idolId: 0
      };
      this.incomeSummarys.push(income1);
    }
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
    this.currentTab = ftype;
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
    this.listIncomeResult();
  }

}

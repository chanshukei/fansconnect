import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Income } from '../model/income';
import { EventService } from '../service/event.service';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.sass']
})
export class IncomeComponent implements OnInit {

  isRedirectToLogin: boolean = true;
  isLoading: boolean = false;
  isLogon: boolean = false;
  infoMessages: string[] = [];
  alertMessages: string[] = [];
  filePath: string = '';
  answer1s: string[] = [];
  editIncome: Income = {
    incomeId: 0,
    payeeName: '',
    tgId: '',
    amount: 0,
    answer1: '',
    answer2: '',
    answer3: '',
    answer4: '',
    answer5: '',
    imageContent: '',
    idolId: 0,
    createDate: new Date()
  };
  logonUsernameEmail: string = "";

  gotoLogin(){
    window.sessionStorage.setItem("redirectTo", "../support-fc");
    this.router.navigate(['../login'], {relativeTo: this.route});
  }

  skipLogin(){
    this.isRedirectToLogin = false;
  }

  backToMenu(): void{
    this.router.navigate(['../home'], {relativeTo: this.route});
  }

  onFileSelected(event: Event): void{
    var fileList = (event.target as HTMLInputElement).files??new Array();
    if(fileList.length > 0){
      var file:File = fileList[0];
      var reader = new FileReader();
      reader.onload = () => {
        console.log('load');
        this.isLoading = true;
        this.filePath = reader.result as string;
      }
      reader.onloadend = () => {
        this.isLoading = false;
        console.log('loadend');
      }
      reader.readAsDataURL(file)
    }
  }

  onSelectionChange(value: string): void{
    var newAnswer1s: string[] = [];
    var isExists = false;
    for(var i=0; i<this.answer1s.length; i++){
      if(this.answer1s[i] != value){
        newAnswer1s.push(this.answer1s[i]);
      }else{
        isExists = true;
      }
    }
    if(!isExists){
      newAnswer1s.push(value);
    }
    this.answer1s = newAnswer1s;
    console.log('ischecked: '+ this.answer1s);
  }

  constructor(
    private eventService: EventService,
    private router: Router,
    private route: ActivatedRoute,
    private ngZone: NgZone) {
      this.ngZone.run(()=>{
        var usernameEmail = window.sessionStorage.getItem("usernameEmail");
        var sessionId = window.sessionStorage.getItem("sessionId");
        if(usernameEmail!='' && sessionId!='' && usernameEmail!=null && sessionId!=null){
          this.isRedirectToLogin = false;
          this.isLogon = true;
          this.logonUsernameEmail = usernameEmail;
          this.router.navigate(['../support-fc'], {relativeTo: this.route});
        }
      });
  }

  ngOnInit(): void {
  }

  cancelEdit(): void{
    this.reset();
  }

  reset(): void{
    this.answer1s.length = 0;
    this.filePath = '';
    this.editIncome = {
      incomeId: 0,
      payeeName: '',
      tgId: '',
      amount: 0,
      answer1: '',
      answer2: '',
      answer3: '',
      answer4: '',
      answer5: '',
      imageContent: '',
      idolId: 0,
      createDate: new Date()
    }
  }

  completeEdit(): void{
    this.isLoading = true;
    this.alertMessages.length = 0;
    if(this.filePath==''){
      this.alertMessages.push("請提供圖片證明");
    }

    if(this.alertMessages.length>0){
      return;
    }

    if(this.editIncome.payeeName==''){
      this.editIncome.payeeName = this.logonUsernameEmail;
    }
    this.editIncome.answer1 = this.answer1s.join();
    this.editIncome.imageContent = this.filePath;
    this.eventService.addIncome(this.editIncome).subscribe(
      data => {
        window.alert("上載成功");
        this.router.navigate(['../home'], {relativeTo: this.route});
      }
    );
  }

  isChecked(value: string):boolean{
    for(var i=0; i<this.answer1s.length; i++){
      if(this.answer1s[i] == value){
        return true;
      }
    }
    return false;
  }

}

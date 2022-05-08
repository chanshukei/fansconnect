import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../service/event.service';
import { Survey } from '../model/survey';
import { SupportitemService } from '../service/supportitem.service';

@Component({
  selector: 'app-survey524',
  templateUrl: './survey524.component.html',
  styleUrls: ['./survey524.component.sass']
})
export class Survey524Component implements OnInit {

  usernameEmail: string ='';
  isRedirectToLogin: boolean = true;
  isOver524: boolean = false;
  isLoading: boolean = false;
  total: number = 0;
  isComplete: boolean = false;
  editForm: Survey = {
    formId: 0,
    idolId: 2,
    answer1: '',
    answer2: '',
    answer3: '',
    answer4: '',
    createBy: ''
  };

  constructor(
    private itemService: SupportitemService,
    private eventService: EventService,
    private router: Router,
    private route: ActivatedRoute,
    private ngZone: NgZone
  ) {
    this.ngZone.run(()=>{
      var usernameEmail = window.sessionStorage.getItem("usernameEmail");
      var sessionId = window.sessionStorage.getItem("sessionId");      
      if(usernameEmail!='' && sessionId!='' && usernameEmail!=null && sessionId!=null){
        this.usernameEmail = usernameEmail;
        this.isRedirectToLogin = false;
      }
      this.router.navigate(['../survey524'], {relativeTo: this.route});
    });
  }

  backToMenu(): void{
    this.router.navigate(['../home'], {relativeTo: this.route});
  }

  completeEdit(): void{
    console.log(this.editForm);
    if(
      this.editForm.answer1=='' || this.editForm.answer2=='' || this.editForm.answer3==''
    ){
      alert('你未完成所有問題。');
      return;
    }
    this.eventService.addSurvey(this.editForm).subscribe(
      data => {
        console.log(data);
        this.isComplete = true;
        alert("已成功提交。");
        this.router.navigate(['../home'], {relativeTo: this.route});
      }
    );
  }

  cancelEdit(): void{
    this.reset();
  }

  reset(): void{
    this.editForm = {
      formId: 0,
      idolId: 2,
      answer1: '',
      answer2: '',
      answer3: '',
      answer4: '',
      createBy: ''
    };
  }

  ngOnInit(): void {
    this.itemService.getMyOrders(1).subscribe(
      e => {
        for(var i=0; i<e.length; i++){          
          this.itemService.getOrderlines(e[i].orderId).subscribe(
            e2 => {
              for(var j=0; j<e2.length; j++){
                if(e2[j].itemId==18 &&  e2[j].totalAmount>=524){
                  this.isOver524 = true;
                  break;
                }
              }
            }
          );
          if(this.isOver524){
            break;
          }
        };
      }
    );
  }

  gotoLogin(){
    window.sessionStorage.setItem("redirectTo", "../survey524");
    this.router.navigate(['../login'], {relativeTo: this.route});
  }

}
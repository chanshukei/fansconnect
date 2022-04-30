import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../service/event.service';
import { Survey } from '../model/survey';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.sass']
})
export class SurveyComponent implements OnInit {

  isRedirectToLogin: boolean = true;
  isLoading: boolean = false;
  total: number = 0;
  isComplete: boolean = false;
  editForm: Survey = {
    formId: 0,
    idolId: 1,
    answer1: '',
    answer2: '',
    answer3: '',
    answer4: ''
  };

  constructor(
    private eventService: EventService,
    private router: Router,
    private route: ActivatedRoute,
    private ngZone: NgZone
  ) {
    this.ngZone.run(()=>{
      var usernameEmail = window.sessionStorage.getItem("usernameEmail");
      var sessionId = window.sessionStorage.getItem("sessionId");
      if(usernameEmail!='' && sessionId!='' && usernameEmail!=null && sessionId!=null){
        this.isRedirectToLogin = false;
      }
      this.router.navigate(['../survey'], {relativeTo: this.route});
    });
  }

  backToMenu(): void{
    this.router.navigate(['../home'], {relativeTo: this.route});
  }

  completeEdit(): void{
    console.log(this.editForm);
    this.eventService.addSurvey(this.editForm).subscribe(
      data => {
        console.log(data);
        this.isComplete = true;
        alert("This survey is submitted successfully. Thanks for your application.");
        this.router.navigate(['../survey'], {relativeTo: this.route});
      }
    );
  }

  cancelEdit(): void{
    this.reset();
  }

  reset(): void{
    this.editForm = {
      formId: 0,
      idolId: 1,
      answer1: '',
      answer2: '',
      answer3: '',
      answer4: ''
    };
  }

  ngOnInit(): void {
  }

  gotoLogin(){
    window.sessionStorage.setItem("redirectTo", "../survey");
    this.router.navigate(['../login'], {relativeTo: this.route});
  }

}

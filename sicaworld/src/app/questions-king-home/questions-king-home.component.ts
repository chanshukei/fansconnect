import { ThisReceiver } from '@angular/compiler';
import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../service/event.service';
import { ProfileForm } from '../model/profile-form';
import { QuestionService } from '../service/question.service';
import { Question } from '../model/question';
import { Qkplayer } from '../model/qkplayer';

@Component({
  selector: 'app-questions-king-home',
  templateUrl: './questions-king-home.component.html',
  styleUrls: ['./questions-king-home.component.sass']
})
export class QuestionsKingHomeComponent implements OnInit {

  mode: string = 'profile';
  isLoading: boolean = false;
  total: number = 0;
  infoMessages: string[] = [];
  alertMessages: string[] = [];
  editForm: ProfileForm = {
    formId: 0,
    location: '',
    idolId: 1,
    gender: '',
    address: '',
    bornyear: '',
    usernameEmail: '',
    tgId: '',
    tgName: ''
  };
  players: Qkplayer[] = [];
  myquestions: Question[] = [];

  constructor(
    private questionService: QuestionService,
    private eventService: EventService,
    private router: Router,
    private route: ActivatedRoute,
    private ngZone: NgZone
  ) {
    this.ngZone.run(()=>{
      var usernameEmail = window.sessionStorage.getItem("usernameEmail");
      var sessionId = window.sessionStorage.getItem("sessionId");
      if(usernameEmail!='' && sessionId!='' && usernameEmail!=null && sessionId!=null){
        this.editForm.usernameEmail = usernameEmail;
        this.router.navigate(['../questions-king-home'], {relativeTo: this.route});
      }else{
        window.sessionStorage.setItem("redirectTo", "../questions-king-home");
        this.router.navigate(['../login'], {relativeTo: this.route});
      }
    });
  }

  changeToDashboard(): void{
    this.mode = 'dashboard';
  }

  changeToMyQuestions():void{
    this.mode = 'myquestions';
  }

  backToMenu(): void{
    this.router.navigate(['../home'], {relativeTo: this.route});
  }

  addQuestion(): void{
    this.router.navigate(['../add-question'], {relativeTo: this.route});
  }

  startGame(): void{
    this.router.navigate(['../questions-king'], {relativeTo: this.route});
  }

  completeEdit(): void{
    this.alertMessages.length = 0;

    if(this.alertMessages.length>0){
      return;
    }

    console.log(this.editForm);
    this.eventService.updateTg(this.editForm).subscribe(
      data => {
        alert("成功提交表格, 會員資料已更新。");
        this.listResult();
      }
    );
  }

  cancelEdit(): void{
    this.reset();
  }

  reset(): void{
    this.editForm = {
      formId: 0,
      location: '',
      idolId: 1,
      gender: '',
      address: '',
      bornyear: '',
      usernameEmail: '',
      tgId: '',
      tgName: ''
    };
  }

  ngOnInit(): void {
    this.listResult();
  }

  listMyQuestions(): void{
    this.isLoading = true;
    this.myquestions = [];
    this.questionService.getMyQuestions(1).subscribe(
      e => {
        for(var i=0; i<e.length; i++){
          this.myquestions.push({
            questionId: e[i].questionId,
            question: e[i].question,
            option3: e[i].option3,
            option4: e[i].option4,
            option1: e[i].option1,
            option2: e[i].option2,
            questionType: e[i].questionType,
            answer: e[i].answer,
            selectedOption: 0,
            idolId: e[i].idolId,
            explain: e[i].explain,
            createBy: e[i].createBy
          });
        };
        this.isLoading = false;
      }
    );
  }

  listDashboard(): void{
    console.log('list dashboard');
    this.isLoading = true;
    this.players = [];
    this.questionService.getQkPlayers(this.editForm.idolId).subscribe(
      data => {
        if(data!=null){
          for(var i=0; i<data.length; i++){
            var p: Qkplayer = {
              tgName: data[i].tgName,
              questionsCount: data[i].questionsCount,
              vquestionsCount: data[i].vquestionsCount,
              answersCount: data[i].answersCount,
              totalMarks: data[i].totalMarks,
              usernameEmail: ''
            };
            this.players.push(p);
          }
        }
        this.isLoading = false;
      }
    );
  }

  listResult(): void{
    this.isLoading = true;
    this.eventService.getProfileForm(this.editForm.idolId).subscribe(
      data => {
        if(data!=null && data.length==1){
          this.editForm = {
            formId: data[0].formId,
            gender: data[0].gender,
            bornyear: data[0].bornyear,
            location: data[0].location,
            address: data[0].address,
            idolId: data[0].idolId,
            usernameEmail: data[0].usernameEmail,
            tgId: data[0].tgId,
            tgName: data[0].tgName
          };

          if(this.editForm.tgName!=''){
            this.mode = 'dashboard';
            this.listDashboard();
            this.listMyQuestions();
          }
        }
        this.isLoading = false;
      }
    );
  }

}

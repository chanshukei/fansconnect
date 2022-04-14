import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from '../service/question.service';
import { Question } from '../model/question';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.sass']
})
export class AddQuestionComponent implements OnInit {

  isLoading: boolean = false;
  isComplete: boolean = false;
  infoMessages: string[] = [];
  alertMessages: string[] = [];
  editQuestion: Question = {
    questionId: 0,
    question: '',
    questionType: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: 0,
    selectedOption: 0,
    explain: '',
    idolId: 1,
    createBy: ''
  };

  constructor(
    private questionService: QuestionService,
    private router: Router,
    private route: ActivatedRoute,
    private ngZone: NgZone
  ) {
    this.ngZone.run(()=>{
      var usernameEmail = window.sessionStorage.getItem("usernameEmail");
      var sessionId = window.sessionStorage.getItem("sessionId");
      if(usernameEmail!='' && sessionId!='' && usernameEmail!=null && sessionId!=null){
        this.router.navigate(['../add-question'], {relativeTo: this.route});
      }else{
        this.router.navigate(['../login'], {relativeTo: this.route});
      }
    });
  }

  backToMenu(): void{
    this.router.navigate(['../home'], {relativeTo: this.route});
  }

  completeEdit(): void{
    this.isLoading = true;
    this.alertMessages.length = 0;

    if(
      this.editQuestion.question=='' || this.editQuestion.option1=='' || this.editQuestion.option2==''
      || this.editQuestion.option3=='' || this.editQuestion.option4==''
      || this.editQuestion.answer<=0 || this.editQuestion.explain==''
    ){
      this.alertMessages.push("請輸入所有資料。");
    }

    if(this.alertMessages.length>0){
      this.isLoading = false;
      return;
    }
    this.editQuestion.createBy = window.sessionStorage.getItem("usernameEmail")??'';

    this.questionService.addQuestion(this.editQuestion).subscribe(
      data => {
        console.log(data);
        this.isComplete = true;
        alert("成功提交問題, 多謝。");
        this.router.navigate(['../questions-king-home'], {relativeTo: this.route});
      }
    );
  }

  cancelEdit(): void{
    this.reset();
  }

  reset(): void{
    this.editQuestion = {
      questionId: 0,
      question: '',
      questionType: '',
      option1: '',
      option2: '',
      option3: '',
      option4: '',
      answer: 0,
      selectedOption: 0,
      explain: '',
      idolId: 1,
      createBy: ''
    };
  }

  ngOnInit(): void {
  }

}

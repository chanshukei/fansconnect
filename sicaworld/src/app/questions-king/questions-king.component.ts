import { Component, NgZone, OnInit } from '@angular/core';
import { QuestionService } from '../service/question.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from '../model/question';
import { QuestionAnswer } from '../model/question-answer';

@Component({
  selector: 'app-questions-king',
  templateUrl: './questions-king.component.html',
  styleUrls: ['./questions-king.component.sass']
})
export class QuestionsKingComponent implements OnInit {

  isLoading: boolean = false;
  mode: string = 'question';
  idolId: number = 0;
  currentQuestionIndex: number = 0;
  questions: Question[] = [];

  constructor(
    private questionService: QuestionService,
    private router: Router,
    private route: ActivatedRoute,
    private ngZone: NgZone) {
      this.ngZone.run(()=>{
        this.router.navigate(['../questions-king'], {relativeTo: this.route});
      });
    }

  backToMenu(): void{
    this.router.navigate(['../home'], {relativeTo: this.route});
  }

  ngOnInit(): void {
    console.log("questions init");
    this.listQuestions();
  }

  listQuestions(): void{
    this.isLoading = true;
    this.questions.length = 0;
    this.questionService.getQuestions2(1).subscribe(
      e => {
        for(var i=0; i<e.length; i++){
          this.questions.push({
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

  goToPreviusQuestion():void{
    if(this.currentQuestionIndex <= 0){
      return;
    }
    this.currentQuestionIndex -= 1;
  }

  goToNextQuestion():void{
    if(this.currentQuestionIndex >= this.questions.length-1){
      return;
    }
    this.currentQuestionIndex += 1;
  }

  onSelectionChange(questionIndex: number, inputAnswer: number): void{
    this.questions[questionIndex].selectedOption = inputAnswer;
  }

  completeQuestion(): void{
    this.isLoading = true;
    var qlen = this.questions.length;
    var qcount = 0;
    var usernameEmail = window.sessionStorage.getItem("usernameEmail")??'';
    this.questions.forEach(q => {
      var qa: QuestionAnswer = {
        answerId: 0,
        questionId: q.questionId,
        answerBy: usernameEmail,
        answer: q.selectedOption
      };
      console.log(qa);
      this.questionService.addQuestionAnswer(qa).subscribe(
        data => {
          qcount += 1;
          if(qcount==qlen){
            this.router.navigate(['../questions-king-home'], {relativeTo: this.route});
          }
        }
      );
    });
  }

}

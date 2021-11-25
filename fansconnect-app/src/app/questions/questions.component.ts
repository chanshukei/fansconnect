import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../question.service';
import { QUESTIONS } from './mock-questions';
import { Question } from './question';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.sass']
})
export class QuestionsComponent implements OnInit {

  idolId: number = 0;
  currentQuestionIndex: number = 0;
  questions: Question[] = [];

  constructor(
    private questionService: QuestionService
  ) { }

  ngOnInit(): void {
    //this.questions = QUESTIONS;
    console.log("questions init");
    this.questionService.getQuestions(1).subscribe(
      e => {
        for(var i=0; i<e.length; i++){
          this.questions.push({
            questionId: e[i].questionId,
            question: e[i].question,
            option1: e[i].option1,
            option2: e[i].option2,
            option3: e[i].option3,
            option4: e[i].option4,
            questionType: e[i].questionType,
            answer: 0
          });
        };
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
    this.questions[questionIndex].answer = inputAnswer;
  }

  completeQuestion(): void{
    /*
    this.questionService.getQuestionResult(this.username.value, this.password.value).subscribe(
      event => {
        var loginResult = event[0];
        console.log("LoginResult: "+ loginResult.userId + "/" + loginResult.result);
        window.sessionStorage.setItem("userId", loginResult.userId);
        this.router.navigate(['../dashboard'], {relativeTo: this.route});
      }
    );
    */
  }

}

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

  isCompleted: boolean = false;
  idolId: number = 0;
  currentQuestionIndex: number = 0;
  questions: Question[] = [];
  correctAnswerCount: number = 0;

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
            answer: e[i].answer,
            selectedOption: 0
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
    this.questions[questionIndex].selectedOption = inputAnswer;
  }

  completeQuestion(): void{
    this.correctAnswerCount = 0;
    for(var i=0; i<this.questions.length; i++){
      if(this.questions[i].answer == this.questions[i].selectedOption){
        this.correctAnswerCount += 1;
      }
    }
    this.isCompleted = true;
  }

}

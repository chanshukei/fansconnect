import { Component, OnInit } from '@angular/core';
import { QUESTIONS } from './mock-questions';
import { Question } from './question';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.sass']
})
export class QuestionsComponent implements OnInit {

  questions: Question[] = [];

  constructor() { }

  ngOnInit(): void {
    this.questions = QUESTIONS;
  }

}

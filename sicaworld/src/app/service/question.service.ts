import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Question } from '../model/question';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Reply } from '../model/reply';
import { QuestionAnswer } from '../model/question-answer';
import { Qkplayer } from '../model/qkplayer';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private questionApi: string = "https://fansconnect-question.azurewebsites.net/api";

  constructor(private http: HttpClient) {}

  getUnreadReply(reply: Reply): Observable<Reply[]>{
    var apiUrl = this.questionApi.concat(
      "/unreadreply/",
      reply.idolId.toString(),
      "?code=ssZeqsClziFhh2pewsiTz8nSKRoY4xVmFtCEfALIICIlszjLTeadaw==");
    return this.http.post<Reply[]>(
      apiUrl,
      reply
    );
  }

  addQuestion(q: Question): Observable<Question[]>{
    var apiUrl = this.questionApi.concat(
      "/addquestion/",
      q.idolId.toString(),
      "?code=XeT3JeSbwZyN6liIMrLZcPjFyzy7aXL7M25d868XqXwN41VGL0Gh1Q==");
    return this.http.post<Question[]>(
      apiUrl,
      q
    );
  }

  addReply(reply: Reply): Observable<Reply[]>{
    var apiUrl = this.questionApi.concat(
      "/addreply/",
      reply.idolId.toString(),
      "?code=oXisCY6JUKckWEaUYkMSlhYCFxkSKyavZaz0a0keuOYfa4u6y2YROw==");
    return this.http.post<Reply[]>(
      apiUrl,
      reply
    );
  }

  addQuestionAnswer(qa: QuestionAnswer): Observable<QuestionAnswer[]>{
    var apiUrl = this.questionApi.concat(
      "/addquestionanswer?code=Tjw0ECjTFzJa0MhirQajU/90Ca7PuWwAOpRnPrGS1YDCZeHCNL6NPQ==");
    return this.http.post<QuestionAnswer[]>(apiUrl, qa);
  }

  askForReply(reply: Reply): Observable<Reply[]>{
    console.log(reply);
    var apiUrl = this.questionApi.concat(
      "/askforreply/",
      reply.idolId.toString(),
      "?code=Q1O6vMjkOj7zWhEfZs9pc1Oiks2SMadRm2vaZ4mUlO9sJIMW1ed2CQ==");
    return this.http.post<Reply[]>(
      apiUrl,
      reply
    );
  }

  getMyQuestions(idolId: number): Observable<Question[]>{
    var apiUrl = this.questionApi.concat(
      "/myquestions/", idolId.toString(),
      "?code=seqV0iA/egeX1oa5s0lNu1HUKCabcJbMlUWRdRQP4cPVgiNTZ0tmkA==");
    var usernameEmail = window.sessionStorage.getItem("usernameEmail");
    return this.http.post<Question[]>(
      apiUrl,
      {
        answerBy: usernameEmail
      }
    );
  }

  getQuestions2(idolId: number): Observable<Question[]>{
    var apiUrl = this.questionApi.concat(
      "/questions2/", idolId.toString(),
      "?code=ZkzWt4HL3TK9HeEVPrk1OVagKSWrG8OLcJO7tU0MVwO7zAcWUGd44Q==");
    var usernameEmail = window.sessionStorage.getItem("usernameEmail");
    return this.http.post<Question[]>(
      apiUrl,
      {
        answerBy: usernameEmail
      }
    );
  }

  getQkPlayers(idolId: number): Observable<Qkplayer[]>{
    var apiUrl = this.questionApi.concat(
      "/qkplayers/", idolId.toString(),
      "?code=xBoGBZLF/HJhD6gYv7AiMVWBEJriFKFdUqwDIJS3tBW65vZPcWDgNw==");
    return this.http.get<Qkplayer[]>(apiUrl).pipe(
      catchError(this.handleError<Qkplayer[]>("Get Qk Players", []))
    );
  }

  getQuestions(idolId: number): Observable<Question[]>{
    var apiUrl = this.questionApi.concat(
      "/questions/", idolId.toString(),
      "?code=HQj0lTd2cv553qTqpFAV82tNU9IXrSOacufJGVSGmpqzjkFDV0KzDg==");
    return this.http.get<Question[]>(apiUrl).pipe(
      catchError(this.handleError<Question[]>("Get Question", []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

}

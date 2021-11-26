import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Question } from './questions/question';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private questionApi: string = "https://fansconnect-question.azurewebsites.net/api";

  constructor(private http: HttpClient) {}

  getQuestions(idolId: number): Observable<Question[]>{
    var apiUrl = this.questionApi.concat(
      "/questions/", idolId.toString(),
      "?code=HQj0lTd2cv553qTqpFAV82tNU9IXrSOacufJGVSGmpqzjkFDV0KzDg==");
    console.log(apiUrl);
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

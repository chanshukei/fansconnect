import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Question } from './questions/question';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  private questionApi: string = "https://fansconnect-question.azurewebsites.net/api";

  constructor(private http: HttpClient) {}

}

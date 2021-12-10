import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Idol } from './idol';
import { UserModel } from './login/usermodel';

@Injectable({
  providedIn: 'root'
})
export class IdolService {

  private questionApi: string = "https://fansconnect-idol.azurewebsites.net/api";

  constructor(private http: HttpClient) {}

  login(user: UserModel):Observable<UserModel>{
    var apiUrl = this.questionApi.concat("/login?");
    return this.http.post<UserModel>(
      apiUrl,
      user
    );
  }

  getIdol(idolId: number): Observable<Idol[]>{
    var apiUrl = this.questionApi.concat(
      "/idol/", idolId.toString(),
      "?code=9/byQETLhU/W7mCSPf5kom0FkWis5kZBOJ6fsGl3G7LIXgQ50cRXPA==");
    console.log(apiUrl);
    return this.http.get<Idol[]>(apiUrl).pipe(
      catchError(this.handleError<Idol[]>("Get Idol", []))
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

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Event } from './events/event';


@Injectable({
  providedIn: 'root'
})
export class EventService {

  private eventApi: string = "https://fansconnect-event.azurewebsites.net/api";

  constructor(private http: HttpClient) {}

  getEvents(idolId: number): Observable<Event[]>{
    var apiUrl = this.eventApi.concat(
      "/events/", idolId.toString(),
      "?code=MggMIyybaGbznNOdl/5asw21tWaw5o8QxtmJkjzcgtPSVXwnzgQQQA==");
    console.log(apiUrl);
    return this.http.get<Event[]>(apiUrl).pipe(
      catchError(this.handleError<Event[]>("Get Question", []))
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

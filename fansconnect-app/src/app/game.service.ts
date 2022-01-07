import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SiCard } from './game-creation/sicard';
import { SiCharactor } from './game-creation/sicharactor';

@Injectable({
  providedIn: 'root'
})
export class GameService  {

  private eventApi: string = "https://fansconnect-game.azurewebsites.net/api";

  constructor(private http: HttpClient) {}

  saveSiCharactor(order: SiCharactor): Observable<SiCharactor>{
    var apiUrl = this.eventApi.concat("/sicharactor/", order.charactorId.toString(), "?");
    console.log(order);
    return this.http.post<SiCharactor>(
      apiUrl,
      order
    );
  }


  addSiCard(order: SiCard): Observable<SiCard>{
    var apiUrl = this.eventApi.concat("/sicard/", order.idolId.toString(), "?");
    console.log(order);
    return this.http.post<SiCard>(
      apiUrl,
      order
    );
  }

  getSiCard(cardId: string): Observable<SiCard[]>{
    var apiUrl = this.eventApi.concat(
      "/sicard/", cardId,
      "?code=2evkpoN40G0fBa71zOaaJz/ixaS8I7xfE47fP53YsX7zvbYmMCO5dg==");
    console.log(apiUrl);
    return this.http.get<SiCard[]>(apiUrl).pipe(
      catchError(this.handleError<SiCard[]>("Get SiCard", []))
    );
  }

  getSiCards(idolId: number): Observable<SiCard[]>{
    var apiUrl = this.eventApi.concat(
      "/sicards/", idolId.toString(),
      "?code=k0cs7/o9cPkv3DNh9ljB5bcEMna9UaiPya7moECJVFaCfqq6u2tfKw==");
    console.log(apiUrl);
    return this.http.get<SiCard[]>(apiUrl).pipe(
      catchError(this.handleError<SiCard[]>("Get SiCards", []))
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

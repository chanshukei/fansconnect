import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { PhotoBattle } from './photobattle/photobattle';


@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  private photoApi: string = "https://fansconnect-photo.azurewebsites.net/api";

  constructor(private http: HttpClient) {}

  getPhotobattles(idolId: number): Observable<PhotoBattle[]>{
    var apiUrl = this.photoApi.concat(
      "/photoBattles/", idolId.toString(),
      "?code=L0udmcgSGBkdmNAFl1w9mJ6po3SpcWxbnbEmwUcIOoUU2YF/aQucCw==");
    console.log(apiUrl);
    return this.http.get<PhotoBattle[]>(apiUrl).pipe(
      catchError(this.handleError<PhotoBattle[]>("Get Photo Battle", []))
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

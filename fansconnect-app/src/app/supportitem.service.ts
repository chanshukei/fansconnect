import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SupportItem } from './supportitem/supportitem';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SupportitemService {

  private eventApi: string = "https://fansconnect-idol.azurewebsites.net/api";

  constructor(private http: HttpClient) {}

  getItems(idolId: number): Observable<SupportItem[]>{
    var apiUrl = this.eventApi.concat(
      "/items/", idolId.toString(),
      "?code=xX0a6l0lKxdBojDNk0FGNUMIg0W8Sx4zjqtd2oUn8R2/KkeuBGX2Lg==");
    console.log(apiUrl);
    return this.http.get<SupportItem[]>(apiUrl).pipe(
      catchError(this.handleError<SupportItem[]>("Get Support Item", []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  saveItem(item: SupportItem, verificationCode: string):Observable<SupportItem>{
    var apiUrl = this.eventApi.concat("/saveitem/", item.idolId.toString(), "/", verificationCode, "?");
    return this.http.post<SupportItem>(
      apiUrl,
      item
    );
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Smaterial } from './smaterial/smaterial';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  private eventApi: string = "https://fansconnect-video.azurewebsites.net/api";

  constructor(private http: HttpClient) {}

  getMaterials(idolId: number): Observable<Smaterial[]>{
    var apiUrl = this.eventApi.concat(
      "/materials/", idolId.toString(),
      "?code=X2KVzRIcdogn0CEZf7aZ2MdV6mgTzKTlkMfTje3yiwGm31kobwndQw==");
    console.log(apiUrl);
    return this.http.get<Smaterial[]>(apiUrl).pipe(
      catchError(this.handleError<Smaterial[]>("Get Material", []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  addMaterial(material: Smaterial): Observable<Smaterial>{
    var apiUrl = this.eventApi.concat("/material/", material.idolId.toString(), "?");
    return this.http.post<Smaterial>(
      apiUrl,
      material
    );
  }
}

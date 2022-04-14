import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DesignItem } from '../model/design-item';
import { VoteItem } from '../model/vote-item';
import { Smaterial } from '../model/smaterial';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  private eventApi: string = "https://fansconnect-video.azurewebsites.net/api";

  constructor(private http: HttpClient) {}

  getDesignItems(idolId: number): Observable<DesignItem[]>{
    var apiUrl = this.eventApi.concat(
      "/designitems/", idolId.toString(),
      "?code=br9z890aM2r1/lKVL1uaTRsaeu8tzbXNcvGYzB3yZp7fgcTCNPaJxQ==");
    console.log(apiUrl);
    return this.http.get<DesignItem[]>(apiUrl).pipe(
      catchError(this.handleError<DesignItem[]>("Get Design Item", []))
    );
  }

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

  addMaterial(item: Smaterial): Observable<Smaterial>{
    var apiUrl = this.eventApi.concat("/material/", item.idolId.toString(), "?");
    return this.http.post<Smaterial>(
      apiUrl,
      item
    );
  }

  addVoteItem(item: VoteItem): Observable<VoteItem>{
    var apiUrl = this.eventApi.concat("/voteitem/", item.idolId.toString(), "?");
    return this.http.post<VoteItem>(
      apiUrl,
      item
    );
  }

  addDesignItem(item: DesignItem): Observable<DesignItem>{
    var apiUrl = this.eventApi.concat("/designitem/", item.idolId.toString(), "?");
    return this.http.post<DesignItem>(
      apiUrl,
      item
    );
  }
}

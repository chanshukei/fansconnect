import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { PhotoBattle } from './photobattle/photobattle';
import { Photo } from './photobattle/photo';


@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  private photoApi: string = "https://fansconnect-photo.azurewebsites.net/api";

  constructor(private http: HttpClient) {}

  addLike(photoId: number):void{
    var apiUrl = this.photoApi.concat("/like/", photoId.toString(), "?");
    this.http.post(
      apiUrl, {}
    ).subscribe(
      data => {
      }
    )
  }

  addPhoto(photo: Photo):void{
    var apiUrl = this.photoApi.concat("/photo/", photo.battleId.toString(), "?");
    console.log(photo);
    this.http.post<Photo>(
      apiUrl,
      photo
    ).subscribe(
      data => {
      }
    )
  }

  getPhotobattles(idolId: number): Observable<PhotoBattle[]>{
    var apiUrl = this.photoApi.concat(
      "/photoBattles/", idolId.toString(),
      "?code=L0udmcgSGBkdmNAFl1w9mJ6po3SpcWxbnbEmwUcIOoUU2YF/aQucCw==");
    console.log(apiUrl);
    return this.http.get<PhotoBattle[]>(apiUrl).pipe(
      catchError(this.handleError<PhotoBattle[]>("Get Photo Battle", []))
    );
  }

  getPhotos(battleId: number): Observable<Photo[]>{
    var apiUrl = this.photoApi.concat(
      "/photos/", battleId.toString(),
      "?code=1BB9pHCk5ddOLVKf77DydiGnZTbO9bYc2YIykj55Ou6YEjbM6KF8DA==");
    console.log(apiUrl);
    return this.http.get<Photo[]>(apiUrl).pipe(
      catchError(this.handleError<Photo[]>("Get Photo Battle", []))
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
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuestionServiceService {

  constructor() { }

  getCustomers(): Observable<Customer[]>{
    var userId: string = sessionStorage.getItem("userId") ?? "";
    var apiUrl = this.domain.concat("/api/Customers/", userId);
    console.log(apiUrl);
    return this.http.get<Customer[]>(apiUrl).pipe(
      catchError(this.handleError<Customer[]>("Get Customer", []))
    );
  }
}

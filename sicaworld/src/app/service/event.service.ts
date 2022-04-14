import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Event } from '../model/event';
import { EventFans } from '../model/eventfans';
import { Income } from '../model/income';
import { Expense } from '../model/expense';
import { Sform } from '../model/sform';
import { SupportItemForm } from '../model/support-item-form';
import { ProfileForm } from '../model/profile-form';
import { UserModel } from '../model/usermodel';
import { Survey } from '../model/survey';
import { Donation } from '../model/donation';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private eventApi: string = "https://fansconnect-event.azurewebsites.net/api";

  constructor(private http: HttpClient) {}

  saveComment(comment: EventFans){
    var apiUrl = this.eventApi.concat("/savecomment/", comment.idolId.toString(), "?");
    this.http.post<EventFans>(
      apiUrl,
      comment
    ).subscribe(
      data => {
      }
    )
  }

  addForm(sform: Sform): Observable<Sform>{
    var apiUrl = this.eventApi.concat("/addform/", sform.idolId.toString(), "?");
    return this.http.post<Sform>(
      apiUrl,
      sform
    );
  }

  addSurvey(sform: Survey): Observable<Survey>{
    var apiUrl = this.eventApi.concat("/addsurvey/", sform.idolId.toString(), "?");
    return this.http.post<Survey>(
      apiUrl,
      sform
    );
  }

  addProfileForm(sform: ProfileForm): Observable<Sform>{
    var apiUrl = this.eventApi.concat("/addprofileform/", sform.idolId.toString(), "?");
    return this.http.post<Sform>(
      apiUrl,
      sform
    );
  }

  updateTg(sform: ProfileForm): Observable<ProfileForm>{
    var apiUrl = this.eventApi.concat("/updatetg/", sform.idolId.toString(), "?");
    return this.http.post<ProfileForm>(
      apiUrl,
      sform
    );
  }

  addSupportItemForm(sform: SupportItemForm): Observable<Sform>{
    var apiUrl = this.eventApi.concat("/addsupportitemform/", sform.idolId.toString(), "?");
    return this.http.post<Sform>(
      apiUrl,
      sform
    );
  }

  addIncome(income: Income): Observable<Income>{
    var apiUrl = this.eventApi.concat("/addincome/", income.idolId.toString(), "?");
    return this.http.post<Income>(
      apiUrl,
      income
    );
  }

  addDonation(donation: Donation): Observable<Donation>{
    var apiUrl = this.eventApi.concat("/donation/", donation.idolId.toString(), "?");
    return this.http.post<Donation>(
      apiUrl,
      donation
    );
  }

  getDonations(idolId: number): Observable<Donation[]>{
    var apiUrl = this.eventApi.concat(
      "/donations/", idolId.toString(),
      "?code=4uf6mJvXia17PoHw8aNUlDC1iT1G8RqkFIPB5LC2bsgrVihwmKTpVA==");
    return this.http.get<Donation[]>(apiUrl).pipe(
      catchError(this.handleError<Donation[]>("Get Donations", []))
    );
  }

  getProfileForm(idolId: number): Observable<ProfileForm[]>{
    var apiUrl = this.eventApi.concat(
      "/profileform/", idolId.toString(),
      "?code=CvKTuwlz6CSBvECLdqZv7MSeT/I46m8KKMiWM8v9Cq2s6fQfwNxpjQ==");
    var usernameEmail = window.sessionStorage.getItem("usernameEmail");
    var sessionId = window.sessionStorage.getItem("sessionId");
    var user: UserModel = {
      usernameEmail: usernameEmail??'',
      sessionId: sessionId??'',
      seessionExpireDatetime: new Date(),
      roleId: ''
    };
    console.log(user);
    return this.http.post<ProfileForm[]>(
      apiUrl,
      user
    );
  }

  getExpenses(idolId: number): Observable<Expense[]>{
    var apiUrl = this.eventApi.concat(
      "/expenses/", idolId.toString(),
      "?code=IClNdGukZViaCAM/AWah3A4oqXPaIq78BFAJga6ah/JDyUFzvE4z5Q==");
    console.log(apiUrl);
    return this.http.get<Expense[]>(apiUrl).pipe(
      catchError(this.handleError<Expense[]>("Get Expenses", []))
    );
  }

  getIncomes(idolId: number): Observable<Income[]>{
    var apiUrl = this.eventApi.concat(
      "/incomes/", idolId.toString(),
      "?code=t2mIu5VYeNWafrpgaz/UmXSyBnFhUza5xC12tbZu7aRkAdHsg32T2w==");
    console.log(apiUrl);
    return this.http.get<Income[]>(apiUrl).pipe(
      catchError(this.handleError<Income[]>("Get Incomes", []))
    );
  }

  getEventFanss(idolId: number): Observable<EventFans[]>{
    var apiUrl = this.eventApi.concat(
      "/eventfanss/", idolId.toString(),
      "?code=LAFYurq2HNIoga96MKXaF1B0rOSYzl2hDlnHje78EmSaIaUHnheEiA==");
    console.log(apiUrl);
    return this.http.get<EventFans[]>(apiUrl).pipe(
      catchError(this.handleError<EventFans[]>("Get Event Fans", []))
    );
  }

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

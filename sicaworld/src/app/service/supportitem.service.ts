import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SupportItem } from '../model/supportitem';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Shopitem } from '../model/shopitem';
import { Order } from '../model/order';
import { UserModel } from '../model/usermodel';
import { Orderline } from '../model/orderline';

@Injectable({
  providedIn: 'root'
})
export class SupportitemService {

  private eventApi: string = "https://fansconnect-idol.azurewebsites.net/api";

  constructor(private http: HttpClient) {}

  updateOrderline(line: Orderline): Observable<Orderline>{
    var apiUrl = this.eventApi.concat("/orderline/", line.lineId.toString(), "?");
    console.log(line);
    return this.http.post<Orderline>(
      apiUrl,
      line
    );
  }

  addOrder(order: Order): Observable<Order>{
    var apiUrl = this.eventApi.concat("/order/", order.idolId.toString(), "?");
    console.log(order);
    return this.http.post<Order>(
      apiUrl,
      order
    );
  }

  modifyOrder(order: Order): Observable<Order>{
    var apiUrl = this.eventApi.concat("/saveorder?");
    console.log(order);
    return this.http.post<Order>(
      apiUrl,
      order
    );
  }

  getOrderlines(orderId: string): Observable<Orderline[]>{
    var apiUrl = this.eventApi.concat(
      "/orderlines/", orderId.toString(),
      "?code=zSlD7g/44S4LmrVdNQjTnunIrr3GCB5B3KaRZxFoWtnVp3hJWWPsLQ==");
      return this.http.get<Orderline[]>(apiUrl).pipe(
        catchError(this.handleError<Orderline[]>("Get Orderlines", []))
      );
  }

  getMyOrders(idolId: number): Observable<Order[]>{
    var apiUrl = this.eventApi.concat(
      "/myorders/", idolId.toString(),
      "?code=/cT6tf0KJhp5aOuV8cYXyEdXC6SwIDhWtLazJyoaXnbevH3lVRUWjw==");
    var usernameEmail = window.sessionStorage.getItem("usernameEmail");
    var sessionId = window.sessionStorage.getItem("sessionId");
    var user: UserModel = {
      usernameEmail: usernameEmail??'',
      sessionId: sessionId??'',
      seessionExpireDatetime: new Date(),
      roleId: ''
    };
    console.log(user);
    return this.http.post<Order[]>(
      apiUrl,
      user
    );
  }

  getOrders(idolId: number): Observable<Order[]>{
    var apiUrl = this.eventApi.concat(
      "/orders/", idolId.toString(),
      "?code=GFL9kG8/dzL6UzaQkWMznXcSReHJvT4yhQWGx4A1VmuKrwmFZRMGpQ==");
    var usernameEmail = window.sessionStorage.getItem("usernameEmail");
    var sessionId = window.sessionStorage.getItem("sessionId");
    var user: UserModel = {
      usernameEmail: usernameEmail??'',
      sessionId: sessionId??'',
      seessionExpireDatetime: new Date(),
      roleId: ''
    };
    console.log(user);
    return this.http.post<Order[]>(
      apiUrl,
      user
    );
  }

  getItems(idolId: number): Observable<SupportItem[]>{
    var apiUrl = this.eventApi.concat(
      "/items/", idolId.toString(),
      "?code=xX0a6l0lKxdBojDNk0FGNUMIg0W8Sx4zjqtd2oUn8R2/KkeuBGX2Lg==");
    console.log(apiUrl);
    return this.http.get<SupportItem[]>(apiUrl).pipe(
      catchError(this.handleError<SupportItem[]>("Get Support Item", []))
    );
  }

  getShopItems(idolId: number): Observable<Shopitem[]>{
    var apiUrl = this.eventApi.concat(
      "/shopitems/", idolId.toString(),
      "?code=gY3gS52DMMJ8QUqAcRCtgfObruy9F0A6WuZghcaeOppC17PkB6CBQQ==");
    console.log(apiUrl);
    return this.http.get<Shopitem[]>(apiUrl).pipe(
      catchError(this.handleError<Shopitem[]>("Get Shop Item", []))
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

  addShopItem(item: Shopitem): Observable<Shopitem>{
    var apiUrl = this.eventApi.concat("/shopitem/", item.idolId.toString(), "?");
    console.log(item);
    return this.http.post<Shopitem>(
      apiUrl,
      item
    );
  }

}

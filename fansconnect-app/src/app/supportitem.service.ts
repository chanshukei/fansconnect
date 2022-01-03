import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SupportItem } from './supportitem/supportitem';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Shopitem } from './shop-item-edit/shopitem';
import { Order } from './shop/order';

@Injectable({
  providedIn: 'root'
})
export class SupportitemService {

  private eventApi: string = "https://fansconnect-idol.azurewebsites.net/api";

  constructor(private http: HttpClient) {}

  addOrder(order: Order): Observable<Order>{
    var apiUrl = this.eventApi.concat("/order/", order.idolId.toString(), "?");
    console.log(order);
    return this.http.post<Order>(
      apiUrl,
      order
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

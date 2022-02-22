import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Player } from './game-battle/player';
import { Snack } from './game-battle/snack';
import { Stage } from './game-battle/stage';
import { StageMonster } from './game-battle/stage-monster';
import { SiCard } from './game-creation/sicard';
import { SiCardInst } from './game-creation/sicard-inst';
import { SiCharactor } from './game-creation/sicharactor';
import { SiSkill } from './game-creation/siskill';
import { Sichapter } from './sicard-game-home/sichapter';
import { Sitask } from './sicard-game-home/sitask';
import { Siworld } from './sicard-game-home/siworld';
import { GameProfile } from './sicard-game-start/game-profile';

@Injectable({
  providedIn: 'root'
})
export class GameService  {

  private eventApi: string = "https://fansconnect-game.azurewebsites.net/api";

  constructor(private http: HttpClient) {}


  saveSiSkills(skills: SiSkill[]): Observable<SiCharactor>{
    var apiUrl = this.eventApi.concat("/siskill/", skills[0].cardId, "?");
    console.log(skills[0].cardId);
    console.log(skills);
    return this.http.post<SiCharactor>(
      apiUrl,
      skills
    );
  }

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
    return this.http.post<SiCard>(
      apiUrl,
      order
    );
  }

  getSiSkills(cardId: string): Observable<SiSkill[]>{
    var apiUrl = this.eventApi.concat(
      "/siskills/", cardId,
      "?code=HAa6mzCrhJYwp6xDg3LyTJxWHPcjnDwUt/6vTQyqmAHAFdm2FaUQkQ==");
    return this.http.get<SiSkill[]>(apiUrl).pipe(
      catchError(this.handleError<SiSkill[]>("Get SiSkill", []))
    );
  }

  getSiCharactor(cardId: string): Observable<SiCharactor[]>{
    var apiUrl = this.eventApi.concat(
      "/sicharactor/", cardId,
      "?code=TSa8CMdSzNjGAsR3h2YIYq1CW8zUy83giKNMNBfsiW8xfP/xKvpwKA==");
    return this.http.get<SiCharactor[]>(apiUrl).pipe(
      catchError(this.handleError<SiCharactor[]>("Get SiCharactor", []))
    );
  }

  deleteSiCard(cardId: string, p: GameProfile): Observable<GameProfile>{
    var apiUrl = this.eventApi.concat(
      "/deletesicard/", cardId, "?");
    return this.http.post<GameProfile>(
      apiUrl,
      p
    );
  }

  createGameProfile(idolId: number, p: GameProfile): Observable<GameProfile>{
    var apiUrl = this.eventApi.concat(
      "/newgame/", idolId.toString(), "?");
    return this.http.post<GameProfile>(
      apiUrl,
      p
    );
  }

  getSichapters(worldId: number, p: GameProfile): Observable<Sichapter[]>{
    var apiUrl = this.eventApi.concat(
      "/sichapter/", worldId.toString(),
      "?code=cTYdsX0ycx4M9B8hEhDOkk/gjvPFJ8ymn3sWD8meSForuNpVFidHhQ==");
    return this.http.post<Sichapter[]>(
      apiUrl,
      p
    );
  }

  getSiPlayers(idolId:number, p: GameProfile): Observable<Player[]>{
    var apiUrl = this.eventApi.concat(
      "/siplayer/", idolId.toString(),
      "?code=lgYMkS1Z4R2vkr0o7YQrGMvvCRQ/XBsfG5uk95WLv5mcKQY4g3Q7AA==");
    return this.http.post<Player[]>(
      apiUrl,
      p
    );
  }

  getSiStageMonsters(stageId:number, p: GameProfile): Observable<StageMonster[]>{
    var apiUrl = this.eventApi.concat(
      "/sistagemonster/", stageId.toString(),
      "?code=aCkQouIDOfGlcMTFBVTMnLpIrLIuI/h2kw/2x/j3U59/j295EQWxXw==");
    return this.http.post<StageMonster[]>(
      apiUrl,
      p
    );
  }

  recoverSta(p: GameProfile): Observable<GameProfile>{
    var apiUrl = this.eventApi.concat(
      "/recoversta",
      "?code=Zf9pmIEE2sRBDkCFtUWPs58OLaW0eLb2PKIFkvnYsbIBtQZUn5VFxQ==");
    return this.http.post<GameProfile>(
      apiUrl,
      p
    );
  }

  startTask(taskId:number, p: GameProfile): Observable<GameProfile>{
    var apiUrl = this.eventApi.concat(
      "/starttask/", taskId.toString(),
      "?code=yLkJOuIngXpEICgzCy9KPnasnomOqJin6cmZrIRwNeu9a6vQMfoZKw==");
    return this.http.post<GameProfile>(
      apiUrl,
      p
    );
  }

  clearTask(taskId:number, p: GameProfile): Observable<GameProfile>{
    var apiUrl = this.eventApi.concat(
      "/cleartask/", taskId.toString(),
      "?code=TxJye2CNIR11f1z/h3J14bZfuOcGWv0NksTYvV4GDXTuzhkbIheacg==");
    console.log(apiUrl);
    return this.http.post<GameProfile>(
      apiUrl,
      p
    );
  }

  getSiStages(taskId:number, p: GameProfile): Observable<Stage[]>{
    var apiUrl = this.eventApi.concat(
      "/sistage/", taskId.toString(),
      "?code=fZ8HhmZGBAvyo0XcHvsMx8rl3sMJBUdZ27BgIWswCIrFwIF8rkCMEw==");
    return this.http.post<Stage[]>(
      apiUrl,
      p
    );
  }

  buySiFoods(cardId:string, p: GameProfile): Observable<GameProfile[]>{
    var apiUrl = this.eventApi.concat(
      "/buysifood/", cardId,
      "?code=pF0T6hcd5HDSBvHpQwLiXV/iQLIYje6oz2fUkzMNeD77vXd6NTQDGQ==");
    return this.http.post<GameProfile[]>(
      apiUrl,
      p
    );
  }

  buySiSnacks(cardId:string, count: number, p: GameProfile): Observable<GameProfile[]>{
    var apiUrl = this.eventApi.concat(
      "/buysisnack/", cardId, "/", count.toString(),
      "?code=3E6LB/zB0g9oG19PYH4DsqDcAbqDIraHoSvNkpuuTsUaEjNAQbrsdg==");
    return this.http.post<GameProfile[]>(
      apiUrl,
      p
    );
  }

  getSiSnacks(idolId:number, p: GameProfile): Observable<Snack[]>{
    var apiUrl = this.eventApi.concat(
      "/sisnack/", idolId.toString(),
      "?code=KBTKpPy6OBTsPS1PF7ApBcpmqoGi2EZsSjfsahW/Ei9Sk8jYMdUw4w==");
    return this.http.post<Snack[]>(
      apiUrl,
      p
    );
  }

  getSitasks(chapterId: number, p: GameProfile): Observable<Sitask[]>{
    var apiUrl = this.eventApi.concat(
      "/sitask/", chapterId.toString(),
      "?code=LkY40vJlmCHaP8g7jyaKl2fOLeY5yFXu20YDid7KWdjBpLWNLmpyug==");
    return this.http.post<Sitask[]>(
      apiUrl,
      p
    );
  }

  getSiworld(idolId: number, p: GameProfile): Observable<Siworld[]>{
    var apiUrl = this.eventApi.concat(
      "/siworld/", idolId.toString(),
      "?code=Js1SxI5Imm0O69Qdlw9aoipKc2hDxZHsA7WdLcYBMZqQ0wKmUuSgCg==");
    return this.http.post<Siworld[]>(
      apiUrl,
      p
    );
  }

  getGameProfile(idolId: number): Observable<GameProfile[]>{
    var apiUrl = this.eventApi.concat(
      "/gameprofile/", idolId.toString(),
      "?code=6wYyZxN10JQsFT2Iw4HSpuPGCdAtv/BOyCXpIuEDVTdoptilPzc/iQ==");
    var usernameEmail = window.sessionStorage.getItem("usernameEmail");
    var user: GameProfile = {
      usernameEmail: usernameEmail??'',
      exp: 0, sta: 0, stone: 0, money: 0,
      gameName: '', gameUid: 0, gameId: '',
      expFull: 0, staFull: 0, rank: 0
    };
    return this.http.post<GameProfile[]>(
      apiUrl,
      user
    );
  }

  getSiCard(cardId: string): Observable<SiCard[]>{
    var apiUrl = this.eventApi.concat(
      "/sicard/", cardId,
      "?code=2evkpoN40G0fBa71zOaaJz/ixaS8I7xfE47fP53YsX7zvbYmMCO5dg==");
    return this.http.get<SiCard[]>(apiUrl).pipe(
      catchError(this.handleError<SiCard[]>("Get SiCard", []))
    );
  }

  getSiCardInsts(idolId: number, p: GameProfile): Observable<SiCardInst[]>{
    console.log(p);
    var apiUrl = this.eventApi.concat(
      "/sicardinst/", idolId.toString(),
      "?code=qtKJyUQhZSmIr1xGaIz52UfHxAnZqHBNPAnEH0RKhDlDJOvUyPrN3g==");
    return this.http.post<SiCardInst[]>(
      apiUrl,
      p
    );
  }

  getSiRestaurantCards(idolId: number): Observable<SiCard[]>{
    var apiUrl = this.eventApi.concat(
      "/sirestaurantcards/", idolId.toString(),
      "?code=2dknYqAhBT4PQjoaefxoDsZieqgzR2O3ZDD8zdSw13Yj7vyiCMd28w==");
    return this.http.get<SiCard[]>(apiUrl).pipe(
      catchError(this.handleError<SiCard[]>("Get restaurant SiCards", []))
    );
  }

  getSiFoodCards(parentId: string): Observable<SiCard[]>{
    var apiUrl = this.eventApi.concat(
      "/sifoodcards/", parentId,
      "?code=N17GB/GliLFLydaSCUaeXDAKoJIyvMG7jr5hcWL0KwBs2NOzfaRKaw==");
    return this.http.get<SiCard[]>(apiUrl).pipe(
      catchError(this.handleError<SiCard[]>("Get food SiCards", []))
    );
  }

  getSiSnackCards(idolId: number): Observable<SiCard[]>{
    var apiUrl = this.eventApi.concat(
      "/sisnackcards/", idolId.toString(),
      "?code=BY38r6eOdfyfNyhd8pB03xwjonaxIcZKgNGZ2L9BARyRc0t13tCtyw==");
    return this.http.get<SiCard[]>(apiUrl).pipe(
      catchError(this.handleError<SiCard[]>("Get snack SiCards", []))
    );
  }


  getSiCards(idolId: number): Observable<SiCard[]>{
    var apiUrl = this.eventApi.concat(
      "/sicards/", idolId.toString(),
      "?code=k0cs7/o9cPkv3DNh9ljB5bcEMna9UaiPya7moECJVFaCfqq6u2tfKw==");
    return this.http.get<SiCard[]>(apiUrl).pipe(
      catchError(this.handleError<SiCard[]>("Get SiCards", []))
    );
  }

  getMySiCards(idolId: number, usernameEmail: string): Observable<SiCard[]>{
    var user: GameProfile = {
      usernameEmail: usernameEmail??'',
      exp: 0, sta: 0, stone: 0, money: 0,
      gameName: '', gameUid: 0, gameId: '',
      expFull: 0, staFull: 0, rank: 0
    };
    var apiUrl = this.eventApi.concat(
      "/mysicards/", idolId.toString(),
      "?code=2xFYQCm6LbhvQQwnhtaPEBZI03R14SjkbsdRFYpoh/mjaGnlGwpa5w==");
    return this.http.post<SiCard[]>(apiUrl,user);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

}

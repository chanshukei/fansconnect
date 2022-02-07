import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from '../game.service';
import { GameProfile } from './game-profile';

@Component({
  selector: 'app-game-start',
  templateUrl: './sicard-game-start.component.html',
  styleUrls: ['./sicard-game-start.component.sass']
})
export class SicardGameStartComponent implements OnInit {

  isLoading: boolean = false;
  gameProfile: GameProfile = {
    gameUid: 0, gameName: '',
    exp: 0, sta: 0, stone: 0, money: 0,
    usernameEmail: '', gameId: '',
    expFull: 0, staFull: 0
  };

  constructor(
    private gameService: GameService,
    private router: Router,
    private route: ActivatedRoute,
    private ngZone: NgZone) {
      this.ngZone.run(()=>{
        var ele = document.getElementById('app-title');
        if(ele!=null){
          ele.hidden =  true;
        }
        var ele2 = document.getElementById('app-footer');
        if(ele2!=null){
          ele2.hidden =  true;
        }

        var usernameEmail = window.sessionStorage.getItem("usernameEmail");
        var sessionId = window.sessionStorage.getItem("sessionId");
        if(usernameEmail!='' && sessionId!='' && usernameEmail!=null && sessionId!=null){
          this.router.navigate(['../sicard-game-start'], {relativeTo: this.route});
        }else{
          window.sessionStorage.setItem("redirectTo", "../sicard-game-start");
          this.router.navigate(['../login'], {relativeTo: this.route});
        }
      });
    }

  ngOnInit(): void {
    var usernameEmail = window.sessionStorage.getItem("usernameEmail")??'';
    this.loadGameSave(usernameEmail);
  }

  continueGame():void{
    var str:string = JSON.stringify(this.gameProfile);
    console.log(str);
    window.sessionStorage.setItem('gameProfile', str);
    this.router.navigate(['../sicard-game-home'], {relativeTo: this.route});
  }

  newGame():void{
    let person = prompt("請輸入你在TG谷用的名?")??'';
    if(person.trim().length>0){
      var usernameEmail = window.sessionStorage.getItem("usernameEmail")??'';
      this.gameProfile = {
        gameUid: 0,
        gameId: '',
        gameName: person,
        exp: 0,
        sta: 10,
        stone: 10,
        money: 1000,
        usernameEmail: usernameEmail,
        expFull: 100, staFull: 10
      };

      this.gameService.createGameProfile(1, this.gameProfile).subscribe(e => {
        this.gameProfile = {
          gameId: e.gameId,
          gameUid: e.gameUid,
          gameName: e.gameName,
          exp: e.exp,
          sta: e.sta,
          stone: e.stone,
          money: e.money,
          usernameEmail: e.usernameEmail,
          expFull: 0, staFull: 0
        };
        var str:string = JSON.stringify(this.gameProfile);
        window.sessionStorage.setItem('gameProfile', str);
        this.router.navigate(['../sicard-game-home'], {relativeTo: this.route});
      });
    }
  }

  loadGameSave(u: string): void{
    this.isLoading = true;
    this.gameService.getGameProfile(1).subscribe(
      e => {
        if(e.length>0){
          //continue
          this.gameProfile = {
            gameId: e[0].gameId,
            gameUid: e[0].gameUid,
            gameName: e[0].gameName,
            exp: e[0].exp,
            sta: e[0].sta,
            stone: e[0].stone,
            money: e[0].money,
            usernameEmail: e[0].usernameEmail,
            expFull: e[0].expFull,
            staFull: e[0].staFull
          };
        }
        this.isLoading = false;
    });
  }

  gotoHome(): void{
    this.router.navigate(['../sicard-game-home'], {relativeTo: this.route});
  }
}

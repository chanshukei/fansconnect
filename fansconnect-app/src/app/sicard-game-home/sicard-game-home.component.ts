import { Component, OnInit } from '@angular/core';
import { GameProfile } from '../sicard-game-start/game-profile';

@Component({
  selector: 'app-sicard-game-home',
  templateUrl: './sicard-game-home.component.html',
  styleUrls: ['./sicard-game-home.component.sass']
})
export class SicardGameHomeComponent implements OnInit {

  gameProfile: GameProfile = {
    gameId: '', gameUid: 0, gameName:'',
    exp: 0, sta: 0, stone: 0, money: 0, usernameEmail: '',
    expFull: 0, staFull: 0
  }

  constructor() {
    var ele = document.getElementById('app-title');
    if(ele!=null){
      ele.hidden =  true;
    }
    var ele2 = document.getElementById('app-footer');
    if(ele2!=null){
      ele2.hidden =  true;
    }
  }

  ngOnInit(): void {
    var str: string = window.sessionStorage.getItem('gameProfile')??'';
    this.gameProfile = JSON.parse(str);
  }

}

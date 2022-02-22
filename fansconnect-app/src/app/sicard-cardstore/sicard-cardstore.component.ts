import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SiCard } from '../game-creation/sicard';
import { SiCardInst } from '../game-creation/sicard-inst';
import { GameService } from '../game.service';
import { GameProfile } from '../sicard-game-start/game-profile';

@Component({
  selector: 'app-sicard-cardstore',
  templateUrl: './sicard-cardstore.component.html',
  styleUrls: ['./sicard-cardstore.component.sass']
})
export class SicardCardstoreComponent implements OnInit {

  isLoading: boolean = false;
  cardInsts: SiCardInst[] = [];

  gameProfile: GameProfile = {
    gameId: '', gameUid: 0, gameName:'',
    exp: 0, sta: 0, stone: 0, money: 0, usernameEmail: '',
    expFull: 0, staFull: 0, rank: 0
  }

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

        var str: string = window.sessionStorage.getItem('gameProfile')??'';
        this.gameProfile = JSON.parse(str);
        if(str!=null && str!=null){
          this.router.navigate(['../sicard-cardstore'], {relativeTo: this.route});
        }else{
          this.router.navigate(['../login'], {relativeTo: this.route});
        }
      });
  }

  gotoShop(): void{
    this.router.navigate(['../sicard-game-home'], {relativeTo: this.route});
  }

  selectRestaurant(idx: number): void{
  }

  ngOnInit(): void {
    this.loadCardInsts();
  }

  loadCardInsts(): void{
    this.isLoading = true;
    this.gameService.getSiCardInsts(1, this.gameProfile).subscribe(
      e => {
        for(var i=0; i<e.length; i++){
          var cardInst: SiCardInst = {
            cardId: e[i].cardId,
            cardUid: e[i].cardUid,
            gameId: e[i].gameId,
            card: []
          };
          this.cardInsts.push(cardInst);
        }
        this.cardInsts.forEach(c =>{
          this.gameService.getSiCard(c.cardId).subscribe(
            e => {
              var card: SiCard = {
                cardId: e[0].cardId,
                cardName: e[0].cardName,
                cardDescription: e[0].cardDescription,
                cardType: e[0].cardType,
                cardRare: e[0].cardRare,
                fileContent: e[0].fileContent,
                fileName: e[0].fileName,
                filePath: e[0].filePath,
                fileType: e[0].fileType,
                idolId: e[0].idolId,
                createDate: e[0].createDate,
                createBy: e[0].createBy,
                status: e[0].status,
                skills: []
              };
              c.card = [card];
            }
          );
        });
        this.isLoading = false;
    });
  }

}

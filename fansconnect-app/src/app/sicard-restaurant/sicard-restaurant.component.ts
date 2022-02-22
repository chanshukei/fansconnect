import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SiCard } from '../game-creation/sicard';
import { SiCharactor } from '../game-creation/sicharactor';
import { GameService } from '../game.service';
import { GameProfile } from '../sicard-game-start/game-profile';

@Component({
  selector: 'app-sicard-restaurant',
  templateUrl: './sicard-restaurant.component.html',
  styleUrls: ['./sicard-restaurant.component.sass']
})
export class SicardRestaurantComponent implements OnInit {

  gameMode: string = 'restaurantList';
  isLoading: boolean = false;
  restaurantCards: SiCard[] = [];
  foodCards: SiCard[] = [];
  selectedRestaurantIdx: number = -1;
  selectedFoodIndex: number = -1;
  foodCharactors: Map<string, SiCharactor> = new Map<string, SiCharactor>();

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
          this.router.navigate(['../sicard-restaurant'], {relativeTo: this.route});
        }else{
          this.router.navigate(['../login'], {relativeTo: this.route});
        }
      });
  }

  getFoodEffect(cardId: string): string{
    var effect: string = '';
    if(this.foodCharactors.has(cardId)){
      var siChar: SiCharactor = this.foodCharactors.get(cardId)??{
        cardId: cardId,
        charactorId: 0,
        hp: 0,
        sp: 0,
        att: 0,
        def: 0,
        effect: '',
        hpLv: 0, spLv:0 ,attLv: 0, defLv: 0
      };
      if(siChar.hp>0){
        effect += (' HP+'+siChar.hp);
      }
      if(siChar.sp>0){
        effect += (' SP+'+siChar.sp);
      }
      if(siChar.att>0){
        effect += (' ATT+'+siChar.att);
      }
      if(siChar.def>0){
        effect += (' DEF+'+siChar.def);
      }
      if(siChar.effect!=''){
        if(siChar.effect.startsWith('dizzy')){
          effect += ' 防止暈眩'+siChar.effect.substring(6)+'次';
        }
      }
    }
    return effect;
  }

  gotoShop(): void{
    this.router.navigate(['../sicard-game-home'], {relativeTo: this.route});
  }

  buyFood(): void{
    var food = this.foodCharactors.get(this.foodCards[this.selectedFoodIndex].cardId);
    this.gameService
      .buySiFoods(this.foodCards[this.selectedFoodIndex].cardId, this.gameProfile)
      .subscribe( e => {
        this.gameProfile.money = e[0].money;
        window.sessionStorage.setItem('foods', JSON.stringify(food));
        window.sessionStorage.setItem('gameProfile', JSON.stringify(this.gameProfile));
        window.alert("點餐成功, 進食完畢, 效果將於下一次戰鬥時發揮。");
        this.selectedFoodIndex = -1;
    });
  }

  selectFood(idx: number): void{
    this.selectedFoodIndex = idx;
  }

  selectRestaurant(idx: number): void{
    this.gameMode = 'foodList';
    this.selectedRestaurantIdx = idx;
    this.loadFoodCards();
  }

  ngOnInit(): void {
    this.loadRestaurantCards();
  }

  loadRestaurantCards(): void{
    this.isLoading = true;
    this.foodCards.length = 0;
    this.gameService.getSiRestaurantCards(1).subscribe(
      e => {
        for(var i=0; i<e.length; i++){
          var e2: SiCard = {
            cardId: e[i].cardId,
            cardName: e[i].cardName,
            cardDescription: e[i].cardDescription,
            cardType: e[i].cardType,
            cardRare: e[i].cardRare,
            fileContent: e[i].fileContent,
            fileName: e[i].fileName,
            filePath: e[i].filePath,
            fileType: e[i].fileType,
            idolId: e[i].idolId,
            createDate: e[i].createDate,
            createBy: e[i].createBy,
            status: e[i].status,
            skills: []
          };
          this.restaurantCards.push(e2);
        }
        this.isLoading = false;
    });
  }

  loadFoodCards(): void{
    this.isLoading = true;
    this.foodCards.length = 0;
    this.gameService.getSiFoodCards(this.restaurantCards[this.selectedRestaurantIdx].cardId).subscribe(
      e => {
        for(var i=0; i<e.length; i++){
          var e2: SiCard = {
            cardId: e[i].cardId,
            cardName: e[i].cardName,
            cardDescription: e[i].cardDescription,
            cardType: e[i].cardType,
            cardRare: e[i].cardRare,
            fileContent: e[i].fileContent,
            fileName: e[i].fileName,
            filePath: e[i].filePath,
            fileType: e[i].fileType,
            idolId: e[i].idolId,
            createDate: e[i].createDate,
            createBy: e[i].createBy,
            status: e[i].status,
            skills: []
          };
          this.foodCards.push(e2);
          this.loadSiCharactor(e2.cardId);
        }
        this.isLoading = false;
    });
  }

  loadSiCharactor(cardId: string): void {
    this.isLoading = true;
    this.gameService.getSiCharactor(cardId).subscribe(
      e => {
        if(e.length==1){
          var sichar: SiCharactor = {
            cardId: e[0].cardId,
            hp: e[0].hp,
            sp: e[0].sp,
            att: e[0].att,
            def: e[0].def,
            charactorId: e[0].charactorId,
            effect: e[0].effect,
            hpLv: 0, spLv:0 ,attLv: 0, defLv: 0
          };
          this.foodCharactors.set(cardId, sichar);
        };
        this.isLoading = false;
      }
    );
  }

}

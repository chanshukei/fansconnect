import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SiCard } from '../game-creation/sicard';
import { SiCharactor } from '../game-creation/sicharactor';
import { GameService } from '../game.service';
import { Monster } from './monster';
import { StageMonster } from './stage-monster';

@Component({
  selector: 'app-game-battle',
  templateUrl: './game-battle.component.html',
  styleUrls: ['./game-battle.component.sass']
})
export class GameBattleComponent implements OnInit {

  isLoading: boolean = false;
  stageMonsters: StageMonster[] = [
    {
      stageUid: 0,
      cardId: '26a9d305-c077-4347-9780-5b321fd2f642',
      monsterCount: 3
    }
  ];

  monsters: Monster[] =[];
  monsterCards: Map<string, SiCard> = new Map<string, SiCard>();
  monsterCharactors: Map<string, SiCharactor> = new Map<string, SiCharactor>();

  constructor(
    private gameService: GameService,
    private router: Router,
    private route: ActivatedRoute,
    private ngZone: NgZone)
  {
    this.ngZone.run(()=>{
      var ele = document.getElementById('app-title');
      if(ele!=null){
        ele.hidden =  true;
      }
      var ele2 = document.getElementById('app-footer');
      if(ele2!=null){
        ele2.hidden =  true;
      }

      this.router.navigate(['../game-battle'], {relativeTo: this.route});
    });
  }

  getMonsterCount(cardId: string): number{
    for(var i=0; i<this.stageMonsters.length; i++){
      if(this.stageMonsters[i].cardId == cardId){
        return this.stageMonsters[i].monsterCount;
      }
    }
    return 0;
  }

  createMonsters(cardId: string): void{
    var card = this.monsterCards.get(cardId);
    var charactor = this.monsterCharactors.get(cardId);
    if(card!=null && charactor!=null){
      var monsterCount = this.getMonsterCount(cardId);
      for(var i=0; i<monsterCount; i++){
        var monster: Monster = {
          card: [card],
          charactor: [charactor],
          hp: charactor.hp,
          sp: charactor.sp,
          att: charactor.att,
          def: charactor.def,
          cardId: cardId
        };
        this.monsters.push(monster);
      }
    }
  }

  loadSiSkills(cardId:string): void{
    this.createMonsters(cardId);
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
            charactorId: e[0].charactorId
          };
          this.monsterCharactors.set(cardId, sichar);
          this.loadSiSkills(cardId);
        };
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.isLoading = true;

    for(var i=0; i<this.stageMonsters.length; i++){

      this.gameService.getSiCard(this.stageMonsters[i].cardId).subscribe(
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
          this.monsterCards.set(card.cardId, card);

          //step 2
          this.loadSiCharactor(card.cardId);
          this.isLoading = false;
        }
      );
    }
  }

}

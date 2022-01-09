import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SiCard } from '../game-creation/sicard';
import { GameService } from '../game.service';
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
      monsterCount: 1
    }
  ];
  monsters: SiCard[] = [];

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
          //this.loadSiCharactor(e2.cardId);
          //this.loadSiSkills(e2);
          var monsterCount = this.getMonsterCount(e[0].cardId);
          this.monsters.push(card);
          this.isLoading = false;
        }
      );
    }
  }

}

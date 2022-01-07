import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SiCard } from '../game-creation/sicard';
import { GameService } from '../game.service';

@Component({
  selector: 'app-sicard-store',
  templateUrl: './sicard-store.component.html',
  styleUrls: ['./sicard-store.component.sass']
})
export class SicardStoreComponent implements OnInit {

  isLoading: boolean = false;
  cards: SiCard[] = [];

  constructor(
    private gameService: GameService,
    private router: Router,
    private route: ActivatedRoute,
    private ngZone: NgZone) {
      this.ngZone.run(()=>{
        this.router.navigate(['../sicard-store'], {relativeTo: this.route});
      });
    }

  backToMenu(): void{
    this.router.navigate(['../home'], {relativeTo: this.route});
  }

  editSiCard(cardId: string): void{
    window.sessionStorage.setItem("editSiCardId", cardId);
    this.router.navigate(['../game-creation'], {relativeTo: this.route});
  }

  getCardType(type: string){
    if(type == 'charactor'){
      return '角色卡';
    }
    return '';
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.gameService.getSiCards(1).subscribe(
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
          };
          this.cards.push(e2);
        };

        this.isLoading = false;
      }
    );
  }


}

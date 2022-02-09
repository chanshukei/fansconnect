import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SiCard } from '../game-creation/sicard';
import { SiCharactor } from '../game-creation/sicharactor';
import { SiSkill } from '../game-creation/siskill';
import { GameService } from '../game.service';

@Component({
  selector: 'app-sicard-store',
  templateUrl: './sicard-storep.component.html',
  styleUrls: ['./sicard-storep.component.sass']
})
export class SicardStorepComponent implements OnInit {

  isLoading: boolean = false;
  cards: SiCard[] = [];
  charactors: Map<string, SiCharactor> = new Map<string, SiCharactor>();

  constructor(
    private gameService: GameService,
    private router: Router,
    private route: ActivatedRoute,
    private ngZone: NgZone) {
      this.ngZone.run(()=>{
        var usernameEmail = window.sessionStorage.getItem("usernameEmail");
        var sessionId = window.sessionStorage.getItem("sessionId");
        if(usernameEmail!='' && sessionId!='' && usernameEmail!=null && sessionId!=null){
          this.router.navigate(['../sicard-storep'], {relativeTo: this.route});
        }else{
          window.sessionStorage.setItem("redirectTo", "../sicard-storep");
          this.router.navigate(['../login'], {relativeTo: this.route});
        }
      });
    }

  backToMenu(): void{
    this.router.navigate(['../home'], {relativeTo: this.route});
  }

  getCharactor(cardId: string):SiCharactor{
    var siChar: SiCharactor = this.charactors.get(cardId)??{
      cardId: cardId,
      charactorId: 0,
      hp: 0,
      sp: 0,
      att: 0,
      def: 0
    };
    return siChar;
  }

  addSiCard(): void{
    this.router.navigate(['../sicard-creation'], {relativeTo: this.route});
  }

  editSiCard(cardId: string): void{
    window.sessionStorage.setItem("editSiCardId", cardId);
    this.router.navigate(['../sicard-creation'], {relativeTo: this.route});
  }

  getCardType(type: string){
    if(type == 'charactor'){
      return '角色卡';
    }
    return '';
  }

  ngOnInit(): void {
    this.isLoading = true;
    var usernameEmail = window.sessionStorage.getItem("usernameEmail")??'';
    this.gameService.getMySiCards(1, usernameEmail).subscribe(
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

          this.loadSiCharactor(e2.cardId);
          this.loadSiSkills(e2);

          this.cards.push(e2);
        };

        this.isLoading = false;
      }
    );
  }

  loadSiSkills(card: SiCard): void{
    this.isLoading = true;
    this.gameService.getSiSkills(card.cardId).subscribe(
      e => {
        var skills: SiSkill[] = [];
        for(var i=0; i<e.length; i++){
          var skill:SiSkill = {
            cardId: e[i].cardId,
            skillId: e[i].skillId,
            skillName: e[i].skillName,
            skillDescription: e[i].skillDescription,
            power: e[i].power,
            effect: e[i].effect,
            sp: e[i].sp
          };
          skills.push(skill);
        };
        card.skills = skills;
        this.isLoading = false;
      }
    );
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
          this.charactors.set(cardId, sichar);
        };
        this.isLoading = false;
      }
    );
  }

}

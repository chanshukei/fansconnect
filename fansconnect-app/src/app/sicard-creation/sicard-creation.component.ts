import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SiCard } from '../game-creation/sicard';
import { SiCharactor } from '../game-creation/sicharactor';
import { SiSkill } from '../game-creation/siskill';
import { GameService } from '../game.service';
import { GameProfile } from '../sicard-game-start/game-profile';

@Component({
  selector: 'app-sicard-creation',
  templateUrl: './sicard-creation.component.html',
  styleUrls: ['./sicard-creation.component.sass']
})
export class SicardCreationComponent implements OnInit {

  editCardId: string = '';
  editCard: SiCard = {
    idolId: 1,
    cardId: '',
    cardName: '',
    cardDescription: '',
    cardRare: 0,
    cardType: '',
    createDate: new Date(),
    createBy: '',
    fileContent: '',
    fileType: '',
    fileName: '',
    filePath: '',
    status: 'draft',
    skills: []
  };

  editCharactor: SiCharactor = {
    cardId: '',
    hp: 0,
    sp: 0,
    att: 0,
    def: 0,
    charactorId: 0,
    effect: ''
  };

  editSkills: SiSkill[] = [];

  isLoading: boolean = false;
  isUploading: boolean = false;
  pagemode: string = '';
  infoMessages: string[] = [];
  alertMessages: string[] = [];
  currentTab: string = 'card';

  constructor(
    private gameService: GameService,
    private router: Router,
    private route: ActivatedRoute,
    private ngZone: NgZone) {
    this.ngZone.run(()=>{
      var usernameEmail = window.sessionStorage.getItem("usernameEmail");
      var sessionId = window.sessionStorage.getItem("sessionId");
      //this.loadAccessRight('admin');
      if(usernameEmail!='' && sessionId!='' && usernameEmail!=null && sessionId!=null){
        this.router.navigate(['../sicard-creation'], {relativeTo: this.route});
      }else{
        this.router.navigate(['../login'], {relativeTo: this.route});
      }
    });
  }

  changeTab(tab: string): void{
    this.currentTab = tab;
    if(tab=='charactor'){
      this.loadSiCharactor();
    }else if(tab=='card'){
      this.loadSiCard();
    }else if(tab=='skill'){
      this.loadSiSkills();
    }
  }

  getNavItemClass(tab: string): string{
    if(this.currentTab==tab){
      return 'nav-link disabled';
    }else{
      return 'nav-link';
    }
  }

  ngOnInit(): void {
    var cardId = window.sessionStorage.getItem("editSiCardId");
    if(cardId!='' && cardId!=null){
      this.editCardId = cardId;
      window.sessionStorage.removeItem("editSiCardId");
    }

    if(this.editCardId!=''){
      this.loadSiCard();

      for(var j=0; j<3; j++){
        this.editSkills[j] = {
          cardId: this.editCardId,
          skillId: 0,
          skillName: '',
          skillDescription: '',
          power: 0,
          effect: '',
          sp: 0
        };
      }
    }
  }

  loadSiSkills(): void {
    this.isLoading = true;

    this.gameService.getSiSkills(this.editCardId).subscribe(
      e => {
        for(var i=0; i<e.length; i++){
          this.editSkills[i] = {
            cardId: e[i].cardId,
            skillId: e[i].skillId,
            skillName: e[i].skillName,
            skillDescription: e[i].skillDescription,
            power: e[i].power,
            effect: e[i].effect,
            sp: e[i].sp
          };
        };
        this.isLoading = false;
      }
    );
  }

  loadSiCharactor(): void {
    this.isLoading = true;
    this.gameService.getSiCharactor(this.editCardId).subscribe(
      e => {
        if(e.length==1){
          this.editCharactor = {
            cardId: e[0].cardId,
            hp: e[0].hp,
            sp: e[0].sp,
            att: e[0].att,
            def: e[0].def,
            charactorId: e[0].charactorId,
            effect: e[0].effect
          };
        };
        this.isLoading = false;
      }
    );
  }

  loadSiCard(): void {
    this.isLoading = true;
    this.gameService.getSiCard(this.editCardId).subscribe(
      e => {
        if(e.length==1){
          this.editCard = {
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
        };
        this.isLoading = false;
      }
    );
  }

  completeEditSkills(): void{
    this.alertMessages.length = 0;

    if(this.alertMessages.length>0){
      return;
    }

    this.infoMessages = ["儲存中..."];
    this.isUploading = true;
    for(var i=0; i<this.editSkills.length; i++){
      this.editSkills[i].cardId = this.editCardId;
    }
    this.gameService.saveSiSkills(this.editSkills).subscribe(
      data => {
        this.infoMessages = ["儲存成功"];
        window.scrollTo(0, 0);
        this.isUploading = false;
      }
    );
  }

  deleteSicard(): void{
    if(this.editCardId==''){
      return;
    }
    if(window.confirm("你肯定要刪除此卡?")){
      var gameprofile: GameProfile = {
        usernameEmail: window.sessionStorage.getItem("usernameEmail")??'',
        gameId: '', gameUid:0, gameName: '',
        exp: 0, expFull: 0, sta: 0, staFull: 0,
        stone: 0, money: 0, rank: 0
      };
      this.gameService.deleteSiCard(this.editCardId, gameprofile).subscribe(
        data => {
          window.alert("刪除成功");
          this.router.navigate(['../sicard-storep'], {relativeTo: this.route});
        }
      );
    }
  }

  completeEditCharactor(): void{
    this.alertMessages.length = 0;

    if(this.alertMessages.length>0){
      return;
    }

    this.infoMessages = ["儲存中..."];
    this.isUploading = true;
    this.editCharactor.cardId = this.editCardId;
    this.gameService.saveSiCharactor(this.editCharactor).subscribe(
      data => {
        this.infoMessages = ["儲存成功"];
        window.scrollTo(0, 0);
        this.isUploading = false;
      }
    );
  }

  completeEdit(): void{
    this.alertMessages.length = 0;

    if(this.alertMessages.length>0){
      return;
    }

    this.infoMessages = ["上載中..."];
    this.isUploading = true;
    this.editCard.idolId = 1;
    this.editCard.createBy = window.sessionStorage.getItem("usernameEmail")??'';
    this.gameService.addSiCard(this.editCard).subscribe(
      data => {
        this.reset();
        window.alert("上載成功, 請繼續設定能力值。");
        this.router.navigate(['../sicard-storep'], {relativeTo: this.route});
      }
    );
  }

  cancelEdit(): void{
    this.reset();
    this.pagemode = 'add';
  }

  backToMenu(): void{
    this.router.navigate(['../sicard-storep'], {relativeTo: this.route});
  }

  reset(): void{
    this.editCard = {
      idolId: 1,
      cardId: '',
      cardName: '',
      cardDescription: '',
      cardRare: 0,
      cardType: '',
      createDate: new Date(),
      createBy: '',
      fileContent: '',
      fileType: '',
      fileName: '',
      filePath: '',
      status: 'draft',
      skills: []
    };
  }

  onFileSelected(event: Event): void{
    var fileList = (event.target as HTMLInputElement).files??new Array();
    if(fileList.length > 0){
      var file:File = fileList[0];
      if(file.size > 1024 * (1024 * 10)){
        this.alertMessages.push("上載檔案不可超過10MB");
        return;
      }

      this.editCard.fileType = file.type;
      this.editCard.fileName = file.name;

      var reader = new FileReader();
      reader.onload = () => {
        var result = reader.result as string;
        this.editCard.fileContent = result.toString().split(',')[1]
      }
      reader.readAsDataURL(file)
    }
  }

}

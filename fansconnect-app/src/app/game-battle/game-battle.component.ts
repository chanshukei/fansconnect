import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { single } from 'rxjs/operators';
import { SiCard } from '../game-creation/sicard';
import { SiCharactor } from '../game-creation/sicharactor';
import { SiSkill } from '../game-creation/siskill';
import { GameService } from '../game.service';
import { Monster } from './monster';
import { Player } from './player';
import { Snack } from './snack';
import { StageMonster } from './stage-monster';

@Component({
  selector: 'app-game-battle',
  templateUrl: './game-battle.component.html',
  styleUrls: ['./game-battle.component.sass']
})
export class GameBattleComponent implements OnInit {

  gameMode: string = '';
  playerPanelMode: string = 'home';
  activeStage: number = 1;
  activePlayer: number = 0;
  activeSkill: number = -1;
  activeTarget: number = -1;
  activeMonster: number = -1;
  activeScript: number = 0;
  activeSnack: number = -1;
  useSnackTime: number = 0;
  isLoading: boolean = false;

  scripts: string[][] = [];
  stageMonsters: StageMonster[] = [
    {
      stageUid: 0,
      cardId: '26a9d305-c077-4347-9780-5b321fd2f642',
      monsterCount: 1
    }
  ];

  snacks: Snack[] = [{
    cardId: '0c2d96c9-7347-4404-997b-a147f17324fa',
    card: [],
    charactor: [],
    count: 99
  },
  {
    cardId: '8fb60e18-b4f3-4feb-9d11-626af52c6728',
    card: [],
    charactor: [],
    count: 99
  }];

  players: Player[] = [{
    cardId: '66d7c238-73e4-4d0b-a58b-6ed60356a8ed',
    card: [],
    charactor: [],
    hp: 0,
    sp: 0,
    att: 0,
    def: 0,
    status: ''
  }];
  playerCards: Map<string, SiCard> = new Map<string, SiCard>();
  playerCharactors: Map<string, SiCharactor> = new Map<string, SiCharactor>();

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

  gotoNextStage(){
    this.activeStage += 1;
    if(this.activeStage==2){
      this.stageMonsters = [
        {
          stageUid: 0,
          cardId: '26a9d305-c077-4347-9780-5b321fd2f642',
          monsterCount: 3
        }
      ];
    }else if(this.activeStage==3){
      this.stageMonsters = [
        {
          stageUid: 0,
          cardId: '8925ec9e-3732-4df8-9429-2c7414216664',
          monsterCount: 1
        },
        {
          stageUid: 0,
          cardId: '26a9d305-c077-4347-9780-5b321fd2f642',
          monsterCount: 2
        }
      ];
    }else if(this.activeStage==4){
      this.stageMonsters = [
        {
          stageUid: 0,
          cardId: '2d8bb3eb-1b53-4c9a-96bb-86e5f4d6335c',
          monsterCount: 1
        }
      ];
    }else if(this.activeStage==5){
      this.router.navigate(['../home'], {relativeTo: this.route});
    }

    //init mosters
    this.initMonsters();

    this.gameMode = "";
    this.playerPanelMode = "home";
  }

  changePlayerPanelMode(mode: string): void{
    this.playerPanelMode = mode;
  }

  getMonsterCount(cardId: string): number{
    for(var i=0; i<this.stageMonsters.length; i++){
      if(this.stageMonsters[i].cardId == cardId){
        return this.stageMonsters[i].monsterCount;
      }
    }
    return 0;
  }

  createPlayers(cardId: string): void{
    var card = this.playerCards.get(cardId);
    var charactor = this.playerCharactors.get(cardId);
    if(card!=null && charactor!=null){
      var player: Player = {
        card: [card],
        charactor: [charactor],
        hp: charactor.hp,
        sp: charactor.sp,
        att: charactor.att,
        def: charactor.def,
        cardId: cardId,
        status: ''
      };
      this.players[0] = player;
    }
  }

  selectPlayerTarget1(mindex: number): void{
    this.activeTarget = mindex;
  }

  nextScript():void{
    if(this.activeScript == this.scripts.length-1){
      this.activeScript = -1;
      this.playerPanelMode = 'home';
    }else{
      this.activeScript += 1;
      if(this.scripts[this.activeScript][0]=='#allMonsterDead#'){
        this.activeScript = -1;
        this.gameMode = 'victory';
      }else if(this.scripts[this.activeScript][0]=='#monsterTurn#'){
        this.activeScript = -1;
        this.monsterTurn();
      }else if(this.scripts[this.activeScript][0]=='#playerDead#'){
        this.activeScript = -1;
        this.gameMode = 'lose';
      }
    }
  }

  continueGame(): void{
    window.open('https://www.youtube.com/watch?v=re6pnLn6D9U');
    this.players[this.activePlayer].hp = this.players[this.activePlayer].charactor[0].hp;
    this.players[this.activePlayer].sp = this.players[this.activePlayer].charactor[0].sp;
    this.gameMode = '';
    this.players[this.activePlayer].status = '';
    this.playerPanelMode = 'home';
  }

  gameOver():void{
    this.router.navigate(['../home'], {relativeTo: this.route});
  }

  monsterTurn():void{
    console.log('monster turn');
    this.activeMonster += 1;
    while(
      this.activeMonster<this.monsters.length
      && this.monsters[this.activeMonster].status=='dead'
    ){
      this.activeMonster += 1;
    }
    if(this.activeMonster>=this.monsters.length){
      //go to player turn
      this.activeMonster = -1;
      this.playerPanelMode = 'home';
      return;
    }

    var player: Player = this.players[this.activePlayer];
    var monster: Monster = this.monsters[this.activeMonster];
    var skills: SiSkill[] = monster.card[0].skills.filter(item => (
      item.sp<=monster.sp
    ));
    var sIndex = Math.floor(Math.random()*skills.length);
    var skill: SiSkill = skills[sIndex];
    var damage:number = Math.floor(skill.power * (monster.att / player.def));
    console.log('damage: '+ damage);
    this.activeScript = 0;
    this.scripts = [[
      monster.monsterUname+' 使用了 '+skill.skillName+'。',
      player.card[0].cardName+" 受到傷害, HP扣減 " + damage+" 點。"
    ]];
    var hp = player.hp - damage;
    if(hp<0){
      player.hp = 0;
    }else{
      player.hp = hp;
    }

    monster.sp = monster.sp - skill.sp;
    if(player.hp==0){
      this.scripts.push([player.card[0].cardName+" 被擊退了。"]);
      //player die animation
      {
        player.status = 'dead';
      }
      //is player dead
      this.scripts.push(["#playerDead#"]);
    }else{
      this.scripts.push(["#monsterTurn#"]);
    }
    this.playerPanelMode = "script";
  }

  selectPlayerTarget2(): void{
    var skill: SiSkill = this.players[this.activePlayer].card[0].skills[this.activeSkill];
    var monster: Monster = this.monsters[this.activeTarget];
    var isMonstersDead: boolean = false;

    if(skill.power>0){
      //animation
      var damage = (skill.power * Math.floor(this.players[this.activePlayer].att)/monster.def);
      console.log('damage: '+ damage);
      this.activeScript = 0;
      this.scripts = [[
        this.players[this.activePlayer].card[0].cardName+' 使用了 '+skill.skillName+'。',
        monster.monsterUname+" 受到傷害, HP扣減 " + damage+" 點。"
      ]];
      var hp = monster.hp - damage;
      if(hp<0){
        monster.hp = 0;
      }else{
        monster.hp = hp;
      }

      this.players[this.activePlayer].sp = this.players[this.activePlayer].sp - skill.sp;
      if(monster.hp==0){
        this.scripts.push([monster.monsterUname+" 被擊退了。"]);
        //monster die
        {
          monster.status = 'dead';
        }
        isMonstersDead = true;
        for(var i=0; i<this.monsters.length; i++){
          if(this.monsters[i].status!='dead'){
            isMonstersDead = false;
            break;
          }
        }

        //is monster dead
        if(isMonstersDead){
          this.scripts.push(["所有怪物被擊退了。"]);
          this.scripts.push(["#allMonsterDead#"]);
        }
      }
    }

    if(!isMonstersDead){
      console.log('add monsterTurn');
      this.scripts.push(["#monsterTurn#"]);
    }
    this.activeSkill = -1;
    this.activeTarget = -1;
    this.playerPanelMode = "script";
  }

  selectPlayerSkill1(skindex: number): void{
    this.activeSkill = skindex;
  }

  selectPlayerSkill2(): void{
    var skill: SiSkill = this.players[this.activePlayer].card[0].skills[this.activeSkill];
    if(skill.power>0){
      this.playerPanelMode = 'skills-attack';
    }
  }

  selectPlayerSnack1(skindex: number): void{
    this.activeSnack = skindex;
  }

  selectPlayerSnack2(): void{
    var snack: Snack = this.snacks[this.activeSnack];
    var player: Player = this.players[this.activePlayer];

    //animation
    this.activeScript = 0;
    this.scripts = [[
      player.card[0].cardName+' 食咗 '+snack.card[0].cardName+'。'
    ]];
    if(snack.charactor[0].hp>0){
      this.scripts[0].push(
        player.card[0].cardName+" HP回復了 " + snack.charactor[0].hp +" 點。"
      );
    }
    if(snack.charactor[0].sp>0){
      this.scripts[0].push(
        player.card[0].cardName+" SP回復了 " + snack.charactor[0].sp +" 點。"
      );
    }

    var hp = player.hp + snack.charactor[0].hp;
    if(hp>player.charactor[0].hp){
      player.hp = player.charactor[0].hp;
    }else{
      player.hp = hp;
    }
    var sp = player.sp + snack.charactor[0].sp;
    if(sp>player.charactor[0].sp){
      player.sp = player.charactor[0].sp;
    }else{
      player.sp = sp;
    }
    snack.count -= 1;
    this.useSnackTime += 1;

    if(snack.count==0){
      this.scripts.push(["所有 "+snack.card[0].cardName+" 食哂啦。"]);
    }
    if(this.useSnackTime==2){
      this.useSnackTime = 0;
      this.scripts.push([player.card[0].cardName+" 食得太飽, 而家郁唔到啦。"]);
      this.scripts.push(["#monsterTurn#"]);
    }

    this.activeSnack = -1;
    this.playerPanelMode = "script";
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
          cardId: cardId,
          monsterUname: monsterCount==1?card.cardName:card.cardName+(i+1),
          status: ''
        };
        this.monsters.push(monster);
      }
    }
  }

  loadSiSkills(cardId:string, ctype: string): void{
    if(ctype=='S'){
      return;
    }

    this.isLoading = true;
    this.gameService.getSiSkills(cardId).subscribe(
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

        console.log('load skills:');
        console.log(skills);
        if(ctype=='M'){
          var monster = this.monsterCards.get(cardId);
          if(monster!=null){
            monster.skills = skills;
            this.createMonsters(cardId);
          }
        }else if(ctype=='P'){
          var player = this.playerCards.get(cardId);
          if(player!=null){
            player.skills = skills;
            this.createPlayers(cardId);
          }
        }

        this.isLoading = false;
      }
    );
  }

  loadSiCharactor(cardId: string, ctype: string): void {
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
          if(ctype == 'M'){
            this.monsterCharactors.set(cardId, sichar);
          }else if(ctype == 'P'){
            this.playerCharactors.set(cardId, sichar);
          }else if(ctype == 'S'){
            //start loop
            for(var i=0; i<this.snacks.length; i++){
              if(this.snacks[i].cardId==cardId){
                console.log('load snack success: '+this.snacks[i].card[0].cardName);
                this.snacks[i].charactor = [sichar];
              }
            }
            //end loop
          }
          this.loadSiSkills(cardId, ctype);
        };
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.isLoading = true;

    //init mosters
    this.initMonsters();
    //init Snacks
    this.initSnacks();

    //load players
    for(var i=0; i<this.players.length; i++){
      this.gameService.getSiCard(this.players[i].cardId).subscribe(
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
          this.playerCards.set(card.cardId, card);

          //step 2
          this.loadSiCharactor(card.cardId, 'P');
        }
      );
    }
  }

  initSnacks():void{
    //load snack
    for(var i=0; i<this.snacks.length; i++){

      this.gameService.getSiCard(this.snacks[i].cardId).subscribe(
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

          //start loop
          for(var i=0; i<this.snacks.length; i++){
            if(this.snacks[i].cardId==card.cardId){
              this.snacks[i].card = [card];
            }
          }
          //end loop

          //step 2
          this.loadSiCharactor(card.cardId, 'S');
          this.isLoading = false;
        }
      );
    }
  }

  initMonsters():void{
    this.monsters =[];
    this.monsterCards = new Map<string, SiCard>();
    this.monsterCharactors = new Map<string, SiCharactor>();

    //load monster
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
          this.loadSiCharactor(card.cardId, 'M');
          this.isLoading = false;
        }
      );
    }

  }

}

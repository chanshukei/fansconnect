import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SiCard } from '../game-creation/sicard';
import { SiCharactor } from '../game-creation/sicharactor';
import { SiSkill } from '../game-creation/siskill';
import { GameService } from '../game.service';
import { Sitask } from '../sicard-game-home/sitask';
import { GameProfile } from '../sicard-game-start/game-profile';
import { Monster } from './monster';
import { Player } from './player';
import { Snack } from './snack';
import { Stage } from './stage';
import { StageMonster } from './stage-monster';

@Component({
  selector: 'app-game-battle',
  templateUrl: './game-battle.component.html',
  styleUrls: ['./game-battle.component.sass']
})
export class GameBattleComponent implements OnInit {

  gameProfile: GameProfile = {
    gameUid:0, gameId: '', gameName:'',
    exp: 0, expFull:0, sta:0, staFull:0,
    stone: 0, money:0, usernameEmail: '', rank: 0
  };
  sitask: Sitask = {
    taskId: 0, taskName: '', staCost: 0, seq: 0, chapterId: 0, taskStatus: '',
    money: 0, exp: 0
  };
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
  isPlayMusic: boolean = true;

  scripts: string[][] = [];

  //in save
  snacks: Snack[] = [];
  playersInTeam: Player[] = [];
  stages: Stage[] = [];
  stageMonsters: StageMonster[] = [];
  foods: SiCharactor[] = [];

  //in game
  players: Player[] = [];
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

      var str: string = window.sessionStorage.getItem('sitask')??'';
      this.sitask = JSON.parse(str);
      var str2: string = window.sessionStorage.getItem('gameProfile')??'';
      this.gameProfile = JSON.parse(str2);
      var foodStr: string = window.sessionStorage.getItem('foods')??'';
      if(foodStr!=''){
        this.foods.push(JSON.parse(foodStr));
        window.sessionStorage.removeItem('foods');
      }

      if(str!=''){
        this.router.navigate(['../game-battle'], {relativeTo: this.route});
      }else{
        this.router.navigate(['../home'], {relativeTo: this.route});
      }
    });
  }

  gotoHome(): void{
    this.router.navigate(['../sicard-game-home'], {relativeTo: this.route});
  }

  playerTakeRest(): void{
    var player = this.players[this.activePlayer];
    var spadd = player.charactor[0].sp*0.1;
    var sp = player.sp + spadd;
    if(sp>player.charactor[0].sp){
      player.sp = player.charactor[0].sp;
    }else{
      player.sp = sp;
    }
    if(player.dizzy>0){
      player.dizzy -= 1;
    }

    this.activeScript = 0;
    this.scripts = [[
      this.players[this.activePlayer].card[0].cardName+'此回合休息, SP回復了'+spadd+'點。'
    ]];
    this.scripts.push(["#monsterTurn#"]);

    this.activeSkill = -1;
    this.activeTarget = -1;
    this.playerPanelMode = "script";
  }

  gotoNextStage(): void{
    this.isLoading = true;
    this.activeStage += 1;
    var stageIndex = this.activeStage-1;
    if(stageIndex<this.stages.length){
      this.gameService.getSiStageMonsters(this.stages[stageIndex].stageUid, this.gameProfile).subscribe(
        e => {
          this.stageMonsters.length = 0;
          for(var i=0; i<e.length; i++){
            var sm: StageMonster = {
              cardId: e[i].cardId,
              monsterCount: e[i].monsterCount,
              stageUid: e[i].stageUid
            };
            this.stageMonsters.push(sm);
          }

          //init mosters
          this.initMonsters();
          this.gameMode = "";
          this.playerPanelMode = "home";
        }
      );
    }else{
      this.clearTask();
    }
  }

  clearTask(): void{
    this.isLoading = true;
    this.gameService.clearTask(this.sitask.taskId, this.gameProfile).subscribe(
      e => {
        this.gameMode = "finish";
        this.gameProfile.exp = e.exp;
        this.gameProfile.expFull = e.expFull;
        this.gameProfile.rank = e.rank;
        this.gameProfile.money = e.money;
        window.sessionStorage.setItem('gameProfile', JSON.stringify(this.gameProfile));
        this.isLoading = false;
      }
    );
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
        status: '',
        dizzy: 0
      };

      //food
      if(this.foods.length>0 && this.foods[0].effect!='' && this.foods[0].effect.startsWith('dizzy')){
        player.dizzy = -Number.parseInt(this.foods[0].effect.substring(6));
        console.log('protect dizzy: '+player.dizzy);
      }

      this.players.push(player);
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
        if(this.activeStage==this.stages.length){
          this.clearTask();
        }else{
          this.gameMode = 'victory';
        }
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
    this.isPlayMusic = false;
    this.gameMode = 'video';
    var self = this;
    window.setTimeout(function(){
      self.players[self.activePlayer].hp = self.players[self.activePlayer].charactor[0].hp;
      self.players[self.activePlayer].sp = self.players[self.activePlayer].charactor[0].sp;
      self.isPlayMusic = true;
      self.gameMode = '';
      self.players[self.activePlayer].status = '';
      self.playerPanelMode = 'home';
    }, 1000 * 60 * 1.5);
  }

  gameOver():void{
    this.router.navigate(['../sicard-game-home'], {relativeTo: this.route});
  }

  monsterTurn():void{
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

    //init
    this.activeScript = 0;
    this.scripts = [[]];
    this.scripts[0].push(monster.monsterUname+' 使用了 '+skill.skillName+'。');

    //effect
    var powerup = 1;
    if(skill.effect.startsWith('dizzy')){
      var pt = skill.effect.split(':');
      var pc = Number.parseInt(pt[1].substring(0, pt[1].indexOf('%')));
      var pcresult = Math.ceil(Math.random()*100);
      if(pcresult<=pc){
        if(player.dizzy<0){
          this.scripts[0].push(player.card[0].cardName+'防止暈倒。');
        }else{
          this.scripts[0].push(player.card[0].cardName+'暈倒, 暫停一回合。');
        }
        player.dizzy += 1;
        if(player.dizzy>1){
          player.dizzy = 1;
        }
      }
    }else if(skill.effect.startsWith('critical')){
      var pt = skill.effect.split(':');
      var pc = Number.parseInt(pt[1].substring(0, pt[1].indexOf('%')));
      var pcresult = Math.ceil(Math.random()*100);
      if(pcresult<=pc){
        powerup = 1.25;
        this.scripts[0].push(player.card[0].cardName+'被重擊。');
      }
    }else if(skill.effect.startsWith('repeat')){
      var pt = skill.effect.split(':');
      var pt2 = pt[1].split('-');
      var fr = Number.parseInt(pt2[0]);
      var to = Number.parseInt(pt2[1]);
      var pcresult = Math.round(Math.random()*(to-fr));
      powerup = to + pcresult;
      this.scripts[0].push(player.card[0].cardName+'被連續攻擊'+powerup+'次。');
    }else if(skill.effect.startsWith('stealsnack')){
      var pt = skill.effect.split(':');
      var pc = Number.parseInt(pt[1].substring(0, pt[1].indexOf('%')));
      var pcresult = Math.round(Math.random()*100);
      if(pcresult<=pc){
        var itemStolen = Number.parseInt(pt[1]);
        var snackIdx = Math.floor(Math.random()*this.snacks.length)
        this.snacks[snackIdx].count -= 1;
        this.scripts[0].push(player.card[0].cardName+'被偷了'+itemStolen+'件'+this.snacks[snackIdx].card[0].cardName+'。');
      }
    }

    var damage:number = Math.floor(skill.power * powerup * (monster.att / player.def));
    if(damage>0){
      this.scripts[0].push(player.card[0].cardName+" 受到傷害, HP扣減 " + damage+" 點。");
    }else{
      this.scripts[0].push(player.card[0].cardName+" 沒有受到傷害。");
    }

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
            charactorId: e[0].charactorId,
            effect: e[0].effect
          };
          if(ctype == 'M'){
            this.monsterCharactors.set(cardId, sichar);
          }else if(ctype == 'P'){
            this.playerCharactors.set(cardId, sichar);
          }else if(ctype == 'S'){
            //start loop
            for(var i=0; i<this.snacks.length; i++){
              if(this.snacks[i].cardId==cardId){
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

  loadSave(): void{
    this.gameService.getSiSnacks(1, this.gameProfile).subscribe(e =>{
      this.snacks.length = 0;
      for(var i=0; i<e.length; i++){
        var s: Snack = {
          cardId: e[i].cardId,
          count: e[i].count,
          card: [],
          charactor: []
        };
        this.snacks.push(s);
      }
      this.initSnacks();
    });

    this.gameService.getSiPlayers(1, this.gameProfile).subscribe(e =>{
      this.playersInTeam.length = 0;
      for(var i=0; i<e.length; i++){
        var p: Player = {
          cardId: e[i].cardId,
          card: [],
          charactor: [],
          hp: 0,
          sp: 0,
          att: 0,
          def: 0,
          status: '',
          dizzy: 0
        };
        this.playersInTeam.push(p);
      }
      this.initPlayersInTeam();
    });

    this.gameService.getSiStages(this.sitask.taskId, this.gameProfile).subscribe(
      e => {
        this.stages.length = 0;
        for(var i=0; i<e.length; i++){
          var s: Stage = {
            stageUid: e[i].stageUid,
            seq: e[i].seq,
            isEnd: e[i].isEnd
          };
          this.stages.push(s);
        }

        //load 1st stage
        this.gameService.getSiStageMonsters(this.stages[0].stageUid, this.gameProfile).subscribe(
          e2 => {
            this.stageMonsters.length = 0;
            for(var j=0; j<e2.length; j++){
              var sm: StageMonster = {
                cardId: e2[j].cardId,
                stageUid: e2[j].stageUid,
                monsterCount: e2[j].monsterCount
              }
              this.stageMonsters.push(sm);
            }
            this.initMonsters();
          }
        );
      }
    );
  }

  initPlayersInTeam(): void{
    this.players.length = 0;
    for(var i=0; i<this.playersInTeam.length; i++){
      this.gameService.getSiCard(this.playersInTeam[i].cardId).subscribe(
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

  ngOnInit(): void {
    this.isLoading = true;
    this.loadSave();
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
    this.isLoading = true;
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

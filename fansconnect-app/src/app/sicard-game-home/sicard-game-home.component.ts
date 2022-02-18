import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from '../game.service';
import { GameProfile } from '../sicard-game-start/game-profile';
import { Sichapter } from './sichapter';
import { Sitask } from './sitask';
import { Siworld } from './siworld';

@Component({
  selector: 'app-sicard-game-home',
  templateUrl: './sicard-game-home.component.html',
  styleUrls: ['./sicard-game-home.component.sass']
})
export class SicardGameHomeComponent implements OnInit {

  mode: string = 'story';
  isLoading: boolean = false;
  selectedWorld: number = 0;
  worlds: Siworld[] = [];
  selectedChapter: number = 0;
  chapters: Sichapter[] = [];
  tasks: Sitask[] = [];

  gameProfile: GameProfile = {
    gameId: '', gameUid: 0, gameName:'',
    exp: 0, sta: 0, stone: 0, money: 0, usernameEmail: '',
    expFull: 0, staFull: 0, rank: 0
  }

  gotoSnackShop(): void{
    this.router.navigate(['../sicard-snack-shop'], {relativeTo: this.route});
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
          this.router.navigate(['../sicard-game-home'], {relativeTo: this.route});
        }else{
          this.router.navigate(['../login'], {relativeTo: this.route});
        }
      });
  }

  ngOnInit(): void {
    this.loadWorlds();
  }

  gotoStory():void{
    this.mode = 'story';
  }

  gotoShop(): void{
    this.mode = 'shop';
  }

  loadWorlds(): void{
    this.isLoading = true;
    this.gameService.getSiworld(1,this.gameProfile).subscribe(
      e => {
        this.worlds.length = 0;
        for(var i=0; i<e.length; i++){
          var w: Siworld = {
            worldId: e[i].worldId,
            worldName: e[i].worldName
          };
          this.worlds.push(w);
        }
        this.isLoading = false;
        this.loadChapters();
    });
  }

  loadChapters(): void{
    this.isLoading = true;
    this.gameService.getSichapters(
      this.worlds[this.selectedWorld].worldId,
      this.gameProfile).subscribe(
      e => {
        this.chapters.length = 0;
        var lastChapter = 0;
        for(var i=0; i<e.length; i++){
          var w: Sichapter = {
            worldId: e[i].worldId,
            chapterId: e[i].chapterId,
            chapterName: e[i].chapterName,
            seq: e[i].seq,
            chapterStatus: e[i].chapterStatus
          };
          if(w.chapterStatus=='open'){
            lastChapter = i;
          }
          this.chapters.push(w);
        }
        this.changeSelectedChapter(lastChapter);
    });
  }

  gotoBattle(t: Sitask): void{
    if(this.gameProfile.sta<t.staCost && this.gameProfile.stone>0){
      if(window.confirm("你沒有足夠的STA挑戰這一關, 需要使用 1 STONE回復STA嗎?")){
        this.gameService.recoverSta(this.gameProfile).subscribe(
          e => {
            this.gameProfile.stone -= 1;
            this.gameProfile.sta = this.gameProfile.staFull;
          }
        );
      }
      return;
    }

    this.gameService.startTask(t.taskId, this.gameProfile).subscribe(
      e => {
        this.gameProfile.sta = e.sta;
        window.sessionStorage.removeItem('gameProfile');
        window.sessionStorage.setItem('gameProfile', JSON.stringify(this.gameProfile));
        var str: string = JSON.stringify(t);
        window.sessionStorage.setItem('sitask', str);
        this.router.navigate(['../game-battle'], {relativeTo: this.route});
      }
    );
  }

  changeSelectedChapter(i: number):void{
    this.isLoading = true;
    this.selectedChapter = i;
    this.loadTasks();
  }

  loadTasks(): void{
    this.isLoading = true;
    this.gameService.getSitasks(
      this.chapters[this.selectedChapter].chapterId,
      this.gameProfile).subscribe(
      e => {
        this.tasks.length = 0;
        for(var i=0; i<e.length; i++){
          var w: Sitask = {
            taskId: e[i].taskId,
            chapterId: e[i].chapterId,
            taskName: e[i].taskName,
            seq: e[i].seq,
            staCost: e[i].staCost,
            taskStatus: e[i].taskStatus,
            money: e[i].money,
            exp: e[i].exp
          };
          this.tasks.push(w);
        }
        this.isLoading = false;
    });
  }
}

import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../service/event.service';
import { Sform } from '../model/sform';

@Component({
  selector: 'app-luckydraw',
  templateUrl: './luckydraw.component.html',
  styleUrls: ['./luckydraw.component.sass']
})
export class LuckydrawComponent implements OnInit {

  smallResults: string[] = [
    'kk.knc.1208_jazz_sonto_mirror',
    'bobo197497050',
    'mcheung8',
    'ryanson_dream',
    'tungtungcher',
    'hrjh.cc',
    'ingrid327',
    'faithy._.c',
    'james.lpy_529',
    'lovesica2021forever'];
  bigResult: string = 'tszlonxx';

  isComplete: boolean = false;
  answer1s: string[] = [];
  infoMessages: string[] = [];
  alertMessages: string[] = [];
  editForm: Sform = {
    formId: 0,
    igId: '',
    answer1: '',
    answer2: '',
    createDate: new Date(),
    idolId: 1
  };

  constructor(
    private eventService: EventService,
    private router: Router,
    private route: ActivatedRoute,
    private ngZone: NgZone) {
      this.ngZone.run(()=>{
        this.router.navigate(['../luckydraw'], {relativeTo: this.route});
      });
    }

  backToMenu(): void{
    this.router.navigate(['../home'], {relativeTo: this.route});
  }

  isChecked(value: string):boolean{
    for(var i=0; i<this.answer1s.length; i++){
      if(this.answer1s[i] == value){
        return true;
      }
    }
    return false;
  }

  completeEdit(): void{
    this.alertMessages.length = 0;
    if(this.editForm.igId==''){
      this.alertMessages.push("請輸入Instagram用戶名稱");
    }

    if(this.alertMessages.length>0){
      return;
    }

    this.editForm.answer1 = this.answer1s.join();
    this.eventService.addForm(this.editForm).subscribe(
      data => {
        this.isComplete = true;
        this.infoMessages = ["成功提交表格, 多謝參與。"]
        window.scrollTo(0, 0);
      }
    );
  }

  cancelEdit(): void{
    this.reset();
  }

  reset(): void{
    this.answer1s.length = 0;
    this.editForm = {
      formId: 0,
      igId: '',
      answer1: '',
      answer2: '',
      createDate: new Date(),
      idolId: 1
    };
  }

  onSelectionChange(value: string): void{
    var newAnswer1s: string[] = [];
    var isExists = false;
    for(var i=0; i<this.answer1s.length; i++){
      if(this.answer1s[i] != value){
        newAnswer1s.push(this.answer1s[i]);
      }else{
        isExists = true;
      }
    }
    if(!isExists){
      newAnswer1s.push(value);
    }
    this.answer1s = newAnswer1s;
    console.log('ischecked: '+ this.answer1s);
  }

  ngOnInit(): void {
  }

}

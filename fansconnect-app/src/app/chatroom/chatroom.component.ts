import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Reply } from '../chatbot/reply';
import { QuestionService } from '../question.service';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.sass']
})
export class ChatroomComponent implements OnInit {

  tgName: string = '';
  usernameEmail: string = '';
  latestReply: number = 0;
  isLoading: boolean = false;
  replyList: Reply[] = [];
  editingReply: Reply = {
    idolId: 1,
    content: '',
    contentType: '',
    replyBy: 'me',
    replyDatetime: new Date(),
    usernameEmail: '',
    tgId: '',
    replyUsId: 0
  };
  isWaiting = false;

  constructor(
    private questionService: QuestionService,
    private router: Router,
    private route: ActivatedRoute,
    private ngZone: NgZone) {
      this.ngZone.run(()=>{
        this.tgName = window.sessionStorage.getItem("tgName")??'';
        this.usernameEmail = window.sessionStorage.getItem("usernameEmail")??'';
        var sessionId = window.sessionStorage.getItem("sessionId");
        if(this.usernameEmail!='' && sessionId!='' && this.usernameEmail!=null && sessionId!=null){
          this.router.navigate(['../chatroom'], {relativeTo: this.route});
        }else{
          this.router.navigate(['../login'], {relativeTo: this.route});
        }
      });
    }

  ngOnInit(): void {
    this.getLatestReplies();
  }

  resetMessage():void{
    this.editingReply = {
      idolId: 1,
      content: '',
      contentType: '',
      replyBy: 'me',
      replyDatetime: new Date(),
      usernameEmail: '',
      tgId: '',
      replyUsId: 0
    };
  }

  getLatestReplies(): void{
    this.getLatestReplies2();
    let intervalId = setInterval(() => {
      this.getLatestReplies2();
    }, 10000);
  }

  getLatestReplies2(): void{
    if(!this.isWaiting){
      this.isWaiting = true;
      this.questionService.getUnreadReply({
        replyUsId: this.latestReply,
        idolId: 1,
        content: '',
        contentType: '',
        replyBy: '',
        replyDatetime: new Date(),
        usernameEmail: '',
        tgId: ''
      }).subscribe(
        e => {
          for(var i=e.length-1; i>=0; i--){
            var e2: Reply = {
              idolId: 1,
              contentType: e[i].contentType,
              content: e[i].content,
              replyBy: e[i].usernameEmail,
              replyDatetime: e[i].replyDatetime,
              usernameEmail: e[i].usernameEmail,
              tgId: e[i].tgId,
              replyUsId: e[i].replyUsId
            };
            if(e2.contentType == null || e2.contentType == ''){
              e2.contentType = "txt";
            }
            if(e2.content.startsWith("http")){
              e2.contentType = "link";
            }
            this.replyList.push(e2);
          };
        }
      );
    }
  }

  askForReply(reply2: Reply):void{
    this.replyList.push(reply2);
    this.questionService.addReply(reply2).subscribe(
      e => {
        console.log('add reply');
      }
    );
  }

  sendMessage():void{
    this.editingReply.replyDatetime = new Date();
    this.editingReply.usernameEmail = this.usernameEmail;
    this.editingReply.replyBy = this.usernameEmail;
    this.editingReply.tgId = this.tgName;
    this.askForReply(this.editingReply);
    this.resetMessage();
  }

}

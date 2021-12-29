import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from '../question.service';
import { Reply } from './reply';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.sass']
})
export class ChatbotComponent implements OnInit {

  editingReply: Reply = {
    idolId: 1,
    content: '',
    contentType: '',
    replyBy: 'me',
    replyDatetime: new Date()
  };

  resetMessage():void{
    this.editingReply = {
      idolId: 1,
      content: '',
      contentType: '',
      replyBy: 'me',
      replyDatetime: new Date()
    };
  }

  replyList: Reply[] = [];

  constructor(
    private questionService: QuestionService,
    private router: Router,
    private route: ActivatedRoute,
    private ngZone: NgZone) {
      this.ngZone.run(()=>{
        this.router.navigate(['../chatbot'], {relativeTo: this.route});
      });
    }

  ngOnInit(): void {
    var firstMessage: Reply = {
      idolId: 1,
      content: '你好',
      contentType: '',
      replyBy: 'me',
      replyDatetime: new Date()
    };
    this.askForReply(firstMessage);
  }

  askForReply(reply2: Reply):void{
    this.replyList.push(reply2);

    this.questionService.askForReply(reply2).subscribe(
      e => {
        for(var i=0; i<e.length; i++){
          var e2: Reply = {
            idolId: 1,
            contentType: e[i].contentType,
            content: e[i].content,
            replyBy: "you",
            replyDatetime: new Date()
          };
          this.replyList.push(e2);
        };
      }
    );
  }

  sendMessage():void{
    this.editingReply.replyDatetime = new Date();
    this.askForReply(this.editingReply);
    this.resetMessage();
  }

}

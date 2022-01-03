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
          if(e2.contentType == null || e2.contentType == ''){
            e2.contentType = "txt";
          }
          if(e2.content.startsWith("http")){
            e2.contentType = "link";
          }

          //content type
          if(e2.content.startsWith("video:")){
            e2.contentType = "video";
            e2.content = e2.content.substring(6);
          }else if(e2.content.startsWith("jsaction:")){
            var jsfunc = e2.content.substring(9).split('|');
            this.doJsAction(jsfunc);
            continue;
          }
          this.replyList.push(e2);
        };
      }
    );
  }

  doJsAction(jsfuns: string[]){
    if('changeBackground' == jsfuns[0]){
      setTimeout(function () {
        document.body.style.backgroundColor = jsfuns[2];
      }, Number(jsfuns[1]) * 1000);
    }
  }

  sendMessage():void{
    this.editingReply.replyDatetime = new Date();
    this.askForReply(this.editingReply);
    this.resetMessage();
  }

}

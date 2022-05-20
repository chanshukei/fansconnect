import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { Question } from '../model/question';
import { Snotification } from '../model/snotification';
import { EventService } from '../service/event.service';
import { Moment } from 'moment';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.sass']
})
export class NotificationsComponent implements OnInit {

  hasPage2: boolean = false;
  hasAccessRight: boolean = false;  
  isLoading: boolean = false;
  isComplete: boolean = false;
  infoMessages: string[] = [];
  alertMessages: string[] = [];
  editNotification: Snotification = {
    notificationId: 0,
    notificationType: '',
    title: '',
    body: '',
    idolId: 1,    
    status: 'created',
    notificationDatetimeObj: new Date(),
    notificationDatetime: ""
  };

  constructor(
    private eventService: EventService,
    private router: Router,
    private route: ActivatedRoute,
    private ngZone: NgZone
  ) {
    this.ngZone.run(()=>{
      var usernameEmail = window.sessionStorage.getItem("usernameEmail");
      var sessionId = window.sessionStorage.getItem("sessionId");
      if(usernameEmail!='' && sessionId!='' && usernameEmail!=null && sessionId!=null){
        this.hasAccessRight = true;
      }      
      this.router.navigate(['../notifications'], {relativeTo: this.route});      
    });
  }

  startIgLive(): void{    
    this.hasPage2 = false;
    if(confirm("要現在通知所有葉子主席開咗IG Live?")){
      this.isLoading = true;
      this.editNotification.notificationType = "igLive";
      this.editNotification.notificationDatetimeObj = new Date();
      this.editNotification.notificationDatetime = moment(this.editNotification.notificationDatetimeObj).utc().format('YYYY-MM-DD HH:mm');
      this.editNotification.title = "突發: 主席開咗IG Live";
      this.editNotification.body = "突發: 主席開咗IG Live";
      console.log(this.editNotification);
      this.eventService.addNotification(this.editNotification).subscribe(
        data => {
          this.isLoading = false;
          console.log(data);
          alert("成功。");
          this.reset();
        }
      );
    }
  }

  startTgLive(): void{    
    this.hasPage2 = false;
  }

  startSicaProgramme(): void{
    this.hasPage2 = true;
  }

  backToMenu(): void{
    this.router.navigate(['../home'], {relativeTo: this.route});
  }

  completeEdit(): void{
    this.isLoading = true;
    this.alertMessages.length = 0;

    if(
      this.editNotification.title=='' || this.editNotification.body==''
    ){
      this.alertMessages.push("請輸入所有資料。");
    }

    if(this.alertMessages.length>0){
      this.isLoading = false;
      return;
    }
    this.eventService.addNotification(this.editNotification).subscribe(
      data => {
        console.log(data);
        alert("成功。");
        this.reset();
      }
    );
  }

  cancelEdit(): void{
    this.reset();
  }

  reset(): void{
    this.editNotification = {
      notificationId: 0,
      notificationType: '',
      title: '',
      body: '',
      idolId: 1,
      status: 'created',
      notificationDatetimeObj: new Date(),
      notificationDatetime: ''
    };
  }

  ngOnInit(): void {
  }

}

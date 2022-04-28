import { Component, NgZone, OnInit } from '@angular/core';
import { EventService } from '../service/event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskModel } from '../model/taskmodel';

@Component({
  selector: 'app-today-task',
  templateUrl: './today-task.component.html',
  styleUrls: ['./today-task.component.sass']
})
export class TodayTaskComponent implements OnInit {

  isRedirectToLogin: boolean = true;
  isLoading: boolean = false;
  tasks: TaskModel[] = [];
  currentPoints: number = 0;

  constructor(
    private eventService: EventService,
    private router: Router,
    private route: ActivatedRoute,
    private ngZone: NgZone) {
      this.ngZone.run(()=>{
        var usernameEmail = window.sessionStorage.getItem("usernameEmail");
        var sessionId = window.sessionStorage.getItem("sessionId");
        if(usernameEmail!='' && sessionId!='' && usernameEmail!=null && sessionId!=null){
          this.isRedirectToLogin = false;
        }
        this.router.navigate(['../today-task'], {relativeTo: this.route});
      });
    }

  backToMenu(): void{
    this.router.navigate(['../home'], {relativeTo: this.route});
  }

  doTask(item: TaskModel): void{
    this.eventService.doTask(item.taskId).subscribe(e =>{
      window.open(item.videoUrl, '_blank');
      this.loadTodayTasks();
      this.loadTasksPoint();
    });    
  }

  gotoLogin(){
    window.sessionStorage.setItem("redirectTo", "../today-task");
    this.router.navigate(['../login'], {relativeTo: this.route});
  }

  ngOnInit(): void {
    console.log("tasks init");
    this.loadTodayTasks();
    this.loadTasksPoint();
  }  
  
  loadTodayTasks(): void {
    this.isLoading = true;
    this.tasks = [];
    this.eventService.getTasks(1).subscribe(
      e => {
        for(var i=0; i<e.length; i++){
          var e2: TaskModel = {
            taskId: e[i].taskId,
            taskName: e[i].taskName,
            taskDescription: e[i].taskDescription,
            startDate: e[i].startDate,
            endDate: e[i].endDate,
            point: e[i].point,
            taskType: e[i].taskType,
            videoName: e[i].videoName,
            videoUrl: e[i].videoUrl,
            idolId: e[i].idolId,
          };
          this.tasks.push(e2);
        };

        this.isLoading = false;
      }
    );
  }

  
  loadTasksPoint(): void {
    this.isLoading = true;
    this.eventService.getTasksPoint(1).subscribe(
      e => {
        this.currentPoints = e.point;
        this.isLoading = false;
      }
    );
  }

}

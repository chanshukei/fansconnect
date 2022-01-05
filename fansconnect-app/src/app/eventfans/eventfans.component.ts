import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { EventFans } from './eventfans';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-events',
  templateUrl: './eventfans.component.html',
  styleUrls: ['./eventfans.component.sass']
})
export class EventfansComponent implements OnInit {

  isLoading: boolean = false;
  abc: string = '';

  eventfanss: EventFans[] = [];
  editEventFans: EventFans = {
    idolId: 1,
    eventId: 0,
    eventDate: new Date(),
    eventTime: '',
    eventName: '',
    eventDescription: '',
    eventType: ''
  };

  constructor(
    private eventService: EventService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  startEdit(event: EventFans): void{
    this.editEventFans = {
      eventId: event.eventId,
      eventName: event.eventName,
      eventDate: event.eventDate,
      eventDescription: event.eventDescription,
      eventTime: event.eventTime,
      eventType: event.eventType,
      idolId: event.idolId
    };
  }

  cancelEdit(): void{
    this.editEventFans = {
      eventId:0, eventDate: new Date(), eventName: '', eventTime:'', eventDescription: '', eventType: '', idolId: 1
    };
  }

  backToEvent(): void{
    this.router.navigate(['../events'], {relativeTo: this.route});
  }

  completeEdit(): void{
    this.eventService.saveComment(this.editEventFans);
  }

  refreshEventFans(): void{
    this.isLoading = true;
    this.eventService.getEventFanss(1).subscribe(
      e => {
        this.eventfanss.length = 0;
        for(var i=0; i<e.length; i++){
          var e2: EventFans = {
            idolId: 1,
            eventId: e[i].eventId,
            eventName: e[i].eventName,
            eventTime: e[i].eventTime,
            eventType: e[i].eventType,
            eventDescription: e[i].eventDescription,
            eventDate: e[i].eventDate
          };
          this.eventfanss.push(e2);
        };

        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    console.log("eventfans init");
    this.refreshEventFans();
  }

}

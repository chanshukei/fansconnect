import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { Event } from './event';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.sass']
})
export class EventsComponent implements OnInit {

  events: Event[] = [];

  constructor(
    private eventService: EventService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  backToMenu(): void{
    this.router.navigate(['../home'], {relativeTo: this.route});
  }

  ngOnInit(): void {
    console.log("events init");
    this.eventService.getEvents(1).subscribe(
      e => {
        for(var i=0; i<e.length; i++){
          var e2: Event = {
            eventId: e[i].eventId,
            eventName: e[i].eventName,
            eventTime: e[i].eventTime,
            eventType: e[i].eventType,
            eventDescription: e[i].eventDescription,
            eventDate: e[i].eventDate,
            videoNames: e[i].videoNames,
            videoUrls: e[i].videoUrls,
            videoNamesList: e[i].videoNames.split(','),
            videoUrlsList: e[i].videoUrls.split(',')
          };
          this.events.push(e2);
        };
      }
    );
  }

}

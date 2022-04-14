import { Component, NgZone, OnInit } from '@angular/core';
import { EventService } from '../service/event.service';
import { Event } from '../model/event';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.sass']
})
export class EventsComponent implements OnInit {

  selectedYearmonth: string = 'all';
  yearmonths: string[] = [];
  isLoading: boolean = false;
  events: Event[] = [];

  constructor(
    private eventService: EventService,
    private router: Router,
    private route: ActivatedRoute,
    private ngZone: NgZone) {
      this.ngZone.run(()=>{
        this.router.navigate(['../events'], {relativeTo: this.route});
      });
    }

  backToMenu(): void{
    this.router.navigate(['../home'], {relativeTo: this.route});
  }

  goToMaterial(): void{
    this.router.navigate(['../material'], {relativeTo: this.route});
  }

  goToEventFans(): void{
    this.router.navigate(['../eventfans'], {relativeTo: this.route});
  }

  ngOnInit(): void {
    console.log("events init");
    this.isLoading = true;
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

          var yearmonth = (e2.eventDate.toString()).substring(0, 7);
          if(this.yearmonths.length==0 || this.yearmonths[this.yearmonths.length-1]!=yearmonth){
            this.yearmonths.push(yearmonth);
          }

          this.events.push(e2);
        };

        this.isLoading = false;
      }
    );
  }

}

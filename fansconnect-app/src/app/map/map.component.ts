import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SupportitemService } from '../supportitem.service';
import { SupportItem } from '../supportitem/supportitem';
import { Shopmarker } from './shopmarker';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.sass']
})
export class MapComponent implements OnInit {

  supportItems: SupportItem[] = [];
  markers: Shopmarker[] = [];

  constructor(
    private itemService: SupportitemService,
    private router: Router,
    private route: ActivatedRoute,
    private ngZone: NgZone) {
      this.ngZone.run(()=>{
        this.router.navigate(['../map'], {relativeTo: this.route});
      });
    }

  backToHome(): void{
    this.router.navigate(['../home'], {relativeTo: this.route});
  }

  gotoList(): void{
    this.router.navigate(['../supportitem'], {relativeTo: this.route});
  }

  listResult(): void{
    this.itemService.getItems(1).subscribe(
      e => {
        for(var i=0; i<e.length; i++){
          var today = new Date();
          var releaseDateObj = new Date(e[i].releaseDate);
          if(releaseDateObj.getTime()>today.getTime()){
            continue;
          }

          var e2: SupportItem = {
            itemId: e[i].itemId,
            itemName: e[i].itemName,
            itemDescription: e[i].itemDescription,
            completeDate: e[i].completeDate,
            releaseDate: e[i].releaseDate,
            releaseTime: e[i].releaseTime,
            releaseLocation: e[i].releaseLocation,
            incomeDate: e[i].incomeDate,
            income: e[i].income,
            paymentDate: e[i].paymentDate,
            payment: e[i].payment,
            idolId: e[i].idolId,
            fansCount: e[i].fansCount,
            itemCount: e[i].itemCount,
            imageContent: '',
            supportType: e[i].supportType,
            coord: e[i].coord
          };
          this.supportItems.push(e2);
        }

        this.initMap();
      }
    );
  }

  initMap():void{
    this.supportItems.forEach(i => {
      if(i.coord!=''){
        var c = i.coord.split(',');
        this.markers.push({
          lat: parseFloat(c[0].trim()),
          lng: parseFloat(c[1].trim())
        });
      }
    });

    var map: google.maps.Map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
      center: this.markers[0],
      zoom: 12,
    });

    this.markers.forEach( marker => {
      new google.maps.Marker({
        position: marker,
        map: map,
      });
    });

  }

  ngOnInit(): void {
    this.listResult();
  }

}

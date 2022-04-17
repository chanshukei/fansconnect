import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SupportitemService } from '../service/supportitem.service';
import { SupportItem } from '../model/supportitem';
import { Shopmarker } from '../model/shopmarker';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.sass']
})
export class MapComponent implements OnInit {

  stype: string = "all";
  supportItems: SupportItem[] = [];
  markers: Shopmarker[] = [];
  selfMarker: Shopmarker = {
    lat: 0,
    lng: 0,
    type: 'self'
  };

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
            coord: e[i].coord,
            distance: 0
          };
          this.supportItems.push(e2);
        }

        this.initMap();
      }
    );
  }

  updateCurrentLocation(): void{
    console.log('update current location');
    this.initMap();
  }

  initMap():void{
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.selfMarker.lat = position.coords.latitude;
        this.selfMarker.lng = position.coords.longitude;
        this.initMap2();
      });
    }
    else {
      alert("Geolocation is not supported by this browser.");
      this.initMap2();
    }
  }

  initMap2():void{
    this.supportItems.forEach(i => {
      if(i.coord!=''){
        var c = i.coord.split(',');
        this.markers.push({
          lat: parseFloat(c[0].trim()),
          lng: parseFloat(c[1].trim()),
          type: i.supportType
        });
      }
    });

    const icons: Record<string, { icon: string }> = {
      '應援茶飲店': {
        icon: "../../assets/icons/drink.png",
      },
      '應援店': {
        icon: "../../assets/icons/food.png",
      },
      '應援書店': {
        icon: "../../assets/icons/book.png",
      },
      '應援玩店': {
        icon: "../../assets/icons/game.png",
      },
      '應援音樂店': {
        icon: "../../assets/icons/music.png",
      },
      '海外應援店': {
        icon: "../../assets/icons/marker.png",
      },
      'YOLICA': {
        icon: "../../assets/icons/yolica.png",
      },
      'self': {
        icon: "../../assets/icons/leaf.png",
      }
    };

    var map: google.maps.Map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
      center: this.selfMarker,
      zoom: 15,
    });

    new google.maps.Marker({
      position: this.selfMarker,
      map: map,
      icon: icons[this.selfMarker.type].icon
    });
    this.markers.forEach( marker => {
      if(marker.type==this.stype || this.stype=='all'){
        new google.maps.Marker({
          position: marker,
          map: map,
          icon: icons[marker.type].icon
        });
      }
    });

  }

  ngOnInit(): void {
    this.listResult();
    setInterval(() => {this.updateCurrentLocation();}, 1000*60*3);
  }

}

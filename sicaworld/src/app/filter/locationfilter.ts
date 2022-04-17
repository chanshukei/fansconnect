import { Pipe, PipeTransform } from '@angular/core';
import { Shopmarker } from '../model/shopmarker';
import { SupportItem } from '../model/supportitem';

@Pipe({
    name: 'locationfilter',
    pure: false
})
export class LocationFilter implements PipeTransform {
    accpetDistance:number = 5;

    getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
      var R:number = 6371; // Radius of the earth in km
      var dLat:number = this.deg2rad(lat2-lat1);  // deg2rad below
      var dLon:number = this.deg2rad(lon2-lon1); 
      var a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2)
        ; 
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      var d = R * c; // Distance in km
      return d;
    }
    
    deg2rad(deg: number): number{
      return deg * (Math.PI/180);
    }

    transform(items: SupportItem[], filter: Shopmarker): any {
        if (!items || !filter) {
            return items;
        }
        return items.filter(item => {
          var c = item.coord.split(',');
          var lat1 = parseFloat(c[0].trim());
          var lng1 = parseFloat(c[1].trim());
          var dist = this.getDistanceFromLatLonInKm(lat1, lng1, filter.lat, filter.lng);
          item.distance = dist;
          return dist<=this.accpetDistance;
        });
    }
}

import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-game-start',
  templateUrl: './sicard-game-start.component.html',
  styleUrls: ['./sicard-game-start.component.sass']
})
export class SicardGameStartComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ngZone: NgZone) {
      this.ngZone.run(()=>{
        var ele = document.getElementById('app-title');
        if(ele!=null){
          ele.hidden =  true;
        }
        var ele2 = document.getElementById('app-footer');
        if(ele2!=null){
          ele2.hidden =  true;
        }

        this.router.navigate(['../sicard-game-start'], {relativeTo: this.route});
      });
    }

  ngOnInit(): void {
  }

  gotoBattle(): void{
    this.router.navigate(['../sicard-game-battle'], {relativeTo: this.route});
  }
}

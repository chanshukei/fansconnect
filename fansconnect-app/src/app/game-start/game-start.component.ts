import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-game-start',
  templateUrl: './game-start.component.html',
  styleUrls: ['./game-start.component.sass']
})
export class GameStartComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ngZone: NgZone) {
      this.ngZone.run(()=>{
        this.router.navigate(['../game-start'], {relativeTo: this.route});
      });
    }

  ngOnInit(): void {
  }

  gotoBattle(): void{
    this.router.navigate(['../game-battle'], {relativeTo: this.route});
  }
}

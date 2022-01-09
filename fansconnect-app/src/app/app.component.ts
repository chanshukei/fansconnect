import { Component } from '@angular/core';
import { IdolService } from './idol.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = '';

  constructor(
    private idolService: IdolService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.idolService.getIdol(1).subscribe(
      e => {
        if(e.length>0){
          this.title = e[0].pageTitleChi;
        };
      }
    );
  }

}

import { Component } from '@angular/core';
import { IdolService } from './idol.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'FANS Connect';

  constructor(
    private idolService: IdolService
  ) { }

  ngOnInit(): void {
    console.log("idol init");
    this.idolService.getIdol(1).subscribe(
      e => {
        if(e.length>0){
          this.title = e[0].pageTitleChi;
        };
      }
    );
  }

}

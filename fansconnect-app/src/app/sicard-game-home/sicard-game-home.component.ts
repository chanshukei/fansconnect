import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sicard-game-home',
  templateUrl: './sicard-game-home.component.html',
  styleUrls: ['./sicard-game-home.component.sass']
})
export class SicardGameHomeComponent implements OnInit {

  constructor() {
    var ele = document.getElementById('app-title');
    if(ele!=null){
      ele.hidden =  true;
    }
    var ele2 = document.getElementById('app-footer');
    if(ele2!=null){
      ele2.hidden =  true;
    }
  }

  ngOnInit(): void {
  }

}

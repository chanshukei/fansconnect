import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Donation } from '../model/donation';
import { Income } from '../model/income';
import { EventService } from '../service/event.service';

@Component({
  selector: 'app-income-review',
  templateUrl: './income-review.component.html',
  styleUrls: ['./income-review.component.sass']
})
export class IncomeReviewComponent implements OnInit {

  isLoading: boolean = false;
  incomes: Income[] = [];

  listOrders(): void{
    this.isLoading = true;
    this.incomes = [];
    this.eventService.getNewIncomes().subscribe(
      e => {
        for(var i=0; i<e.length; i++){
          var e2: Income = {
            idolId: e[i].idolId,
            payeeName: e[i].payeeName,
            createDate: e[i].createDate,
            incomeId: e[i].incomeId,
            amount: e[i].amount,
            imageContent: e[i].imageContent,
            answer1: '',
            answer2: '',
            answer3: '',
            answer4: '',
            answer5: '',
            tgId: e[i].tgId
          };
          this.incomes.push(e2);
        };
        this.isLoading = false;
      }
    );
  }

  constructor(
    private eventService: EventService,
    private router: Router,
    private route: ActivatedRoute,
    private ngZone: NgZone
  ) {
    this.ngZone.run(()=>{
      var usernameEmail = window.sessionStorage.getItem("usernameEmail");
      var sessionId = window.sessionStorage.getItem("sessionId");
      if(usernameEmail!='' && sessionId!='' && usernameEmail!=null && sessionId!=null){
        this.router.navigate(['../donationReview'], {relativeTo: this.route});
      }else{
        this.router.navigate(['../login'], {relativeTo: this.route});
      }
    });
  }

  ngOnInit(): void {
    this.listOrders();
  }

  backToMenu(): void{
    this.router.navigate(['../home'], {relativeTo: this.route});
  }
}

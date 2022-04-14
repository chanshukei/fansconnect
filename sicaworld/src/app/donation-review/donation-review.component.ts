import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Donation } from '../model/donation';
import { EventService } from '../service/event.service';

@Component({
  selector: 'app-donation-review',
  templateUrl: './donation-review.component.html',
  styleUrls: ['./donation-review.component.sass']
})
export class DonationReviewComponent implements OnInit {

  isShowImage: boolean = false;
  isLoading: boolean = false;
  donations: Donation[] = [];

  listOrders(): void{
    this.isLoading = true;
    this.donations = [];
    this.eventService.getDonations(1).subscribe(
      e => {
        for(var i=0; i<e.length; i++){
          var e2: Donation = {
            idolId: e[i].idolId,
            uploadBy: e[i].uploadBy,
            uploadDate: e[i].uploadDate,
            donationId: e[i].donationId,
            fileContent: '',
            fileName: '',
            filePath: '',
            fileType: '',
            amount: e[i].amount,
            answer1: e[i].answer1
          };
          this.donations.push(e2);
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

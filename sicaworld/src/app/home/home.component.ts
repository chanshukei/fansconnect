import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IdolService } from '../idol.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  usernameEmail: string = '';
  isLogon: boolean = false;
  adminAccessRight: boolean = false;

  constructor(
    private idolService: IdolService,
    private router: Router,
    private route: ActivatedRoute,
    private ngZone: NgZone) {
      this.ngZone.run(()=>{
        this.loadAccessRight('admin');
        this.router.navigate(['../home'], {relativeTo: this.route});
      });
    }

  ngOnInit(): void {
    this.initPage();
  }

  loadAccessRight(roleId :string): void{
    this.idolService.checkAccessRight(1, roleId).subscribe(
      e => {
        this.adminAccessRight = e.length>0;
      }
    );
  }

  gotoSurvey():void{
    this.router.navigate(['../survey'], {relativeTo: this.route});
  }

  gotoSupportItemForm():void{
    this.router.navigate(['../support-item-form'], {relativeTo: this.route});
  }

  gotoLuckyDraw():void{
    this.router.navigate(['../luckydraw'], {relativeTo: this.route});
  }

  gotoShop():void{
    this.router.navigate(['../shop'], {relativeTo: this.route});
  }

  chatbotLockCount: number = 3
  gotoChatbot(): void{
    /*
    this.chatbotLockCount -= 1;
    console.log("unlock chatbot: "+this.chatbotLockCount);
    if(this.chatbotLockCount<=0){
      this.router.navigate(['../chatbot'], {relativeTo: this.route});
    }
    */
  }

  initPage(): void{
    var usernameEmail = window.sessionStorage.getItem("usernameEmail");
    var sessionId = window.sessionStorage.getItem("sessionId");
    console.log(usernameEmail+':'+sessionId);
    if(usernameEmail!='' && sessionId!='' && usernameEmail!=null && sessionId!=null){
      this.isLogon = true;
      this.usernameEmail = usernameEmail;
    }else{
      this.usernameEmail = '';
      this.isLogon = false;
    }
  }

  gotoLogin(){
    this.router.navigate(['../login'], {relativeTo: this.route});
  }

  logout(){
    window.sessionStorage.removeItem("usernameEmail");
    window.sessionStorage.removeItem("sessionId");
    this.isLogon = false;
    this.usernameEmail = '';
  }

  gotoSicardStore(): void{
    this.router.navigate(['../sicard-storep'], {relativeTo: this.route});
  }

  gotoSicard(): void{
    this.router.navigate(['../sicard-game-start'], {relativeTo: this.route});
  }

  goToDonation(): void{
    this.router.navigate(['../donation'], {relativeTo: this.route});
  }

  goToMaterial(): void{
    this.router.navigate(['../material'], {relativeTo: this.route});
  }

  goToSupport(): void{
    this.router.navigate(['../supportitem'], {relativeTo: this.route});
  }

  goToPhotoBattle(): void{
    this.router.navigate(['../design-comp'], {relativeTo: this.route});
  }

  goToQuestions(): void{
    this.router.navigate(['../questions'], {relativeTo: this.route});
  }

  goToQuestionsKing(): void{
    this.router.navigate(['../questions-king-home'], {relativeTo: this.route});
  }

  goToEvents(): void{
    this.router.navigate(['../events'], {relativeTo: this.route});
  }

  goToIncome(): void{
    this.router.navigate(['../income'], {relativeTo: this.route});
  }

  goToDashboard(): void{
    this.router.navigate(['../dashboard'], {relativeTo: this.route});
  }

}

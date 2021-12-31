import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  usernameEmail: string = '';
  isLogon: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ngZone: NgZone) {
      this.ngZone.run(()=>{
        this.router.navigate(['../home'], {relativeTo: this.route});
      });
    }

  ngOnInit(): void {
    this.initPage();
  }

  gotoLuckyDraw():void{
    this.router.navigate(['../luckydraw'], {relativeTo: this.route});
  }

  chatbotLockCount: number = 3
  gotoChatbot(): void{
    this.chatbotLockCount -= 1;
    console.log("unlock chatbot: "+this.chatbotLockCount);
    if(this.chatbotLockCount<=0){
      this.router.navigate(['../chatbot'], {relativeTo: this.route});
    }
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

  goToMaterial(): void{
    this.router.navigate(['../material'], {relativeTo: this.route});
  }

  goToSupport(): void{
    this.router.navigate(['../supportitem'], {relativeTo: this.route});
  }

  goToPhotoBattle(): void{
    this.router.navigate(['../photobattle'], {relativeTo: this.route});
  }

  goToQuestions(): void{
    this.router.navigate(['../questions'], {relativeTo: this.route});
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

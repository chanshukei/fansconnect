import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IdolService } from '../idol.service';
import { UserModel } from './usermodel';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  alertMessage: string = "";
  user: UserModel = {
    usernameEmail: '',
    sessionId: '',
    seessionExpireDatetime: new Date()
  }

  constructor(
    private idolService: IdolService,
    private router: Router,
    private route: ActivatedRoute) {
  }

  public onSignIn(googleUser: gapi.auth2.GoogleUser) {
    var profile:gapi.auth2.BasicProfile = googleUser.getBasicProfile();
    this.user.usernameEmail = profile.getEmail();
    this.idolService.login(this.user).subscribe(
      data => {
        window.sessionStorage.setItem("usernameEmail", data.usernameEmail);
        window.sessionStorage.setItem("sessionId", data.sessionId);
        this.router.navigate(['../home'], {relativeTo: this.route});
      },
      error => {
        console.error(error);
        window.alert("登入失敗, 請檢查輸入的資料是否正確。");
        window.sessionStorage.removeItem("sessionId");
      }
    );
  };

  ngOnInit(): void {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'light',
      'onsuccess': param => this.onSignIn(param)
    });
  }

  cancelEdit():void{
    this.router.navigate(['../home'], {relativeTo: this.route});
  }

}

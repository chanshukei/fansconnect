import { Component, OnInit } from '@angular/core';
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
    userid: '',
    password: '',
    verificationCode: ''
  }

  constructor(
    private idolService: IdolService,
    private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
  }

  cancelEdit():void{
    this.user = {
      userid: '',
      password: '',
      verificationCode: ''
    };
    this.router.navigate(['../home'], {relativeTo: this.route});
  }

  completeEdit():void{
    this.idolService.login(this.user).subscribe(
      data => {
        console.log(data);
        window.sessionStorage.setItem("verificationCode", data.verificationCode);
        this.router.navigate(['../supportitem'], {relativeTo: this.route});
      },
      error => {
        console.error(error);
        this.alertMessage = "登入失敗, 請檢查輸入的資料是否正確。";
        window.sessionStorage.removeItem("verificationCode");
      }
    );
  }

}

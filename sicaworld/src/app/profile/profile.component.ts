import { ThisReceiver } from '@angular/compiler';
import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../service/event.service';
import { ProfileForm } from '../model/profile-form';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {

  isLoading: boolean = false;
  total: number = 0;
  isComplete: boolean = false;
  infoMessages: string[] = [];
  alertMessages: string[] = [];
  editForm: ProfileForm = {
    formId: 0,
    location: '',
    idolId: 1,
    gender: '',
    address: '',
    bornyear: '',
    usernameEmail: '',
    tgId: '',
    tgName: ''
  };

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
        this.editForm.usernameEmail = usernameEmail;
        this.router.navigate(['../profile'], {relativeTo: this.route});
      }else{
        this.router.navigate(['../login'], {relativeTo: this.route});
      }
    });
  }

  backToMenu(): void{
    this.router.navigate(['../home'], {relativeTo: this.route});
  }

  completeEdit(): void{
    this.alertMessages.length = 0;

    if(this.alertMessages.length>0){
      return;
    }

    console.log(this.editForm);
    this.eventService.addProfileForm(this.editForm).subscribe(
      data => {
        console.log(data);
        this.isComplete = true;
        alert("成功提交表格, 會員資料已更新。");
        this.router.navigate(['../profile'], {relativeTo: this.route});
      }
    );
  }

  cancelEdit(): void{
    this.reset();
  }

  reset(): void{
    this.editForm = {
      formId: 0,
      location: '',
      idolId: 1,
      gender: '',
      address: '',
      bornyear: '',
      usernameEmail: '',
      tgId: '',
      tgName: ''
    };
  }

  ngOnInit(): void {
    this.listResult();
  }

  listResult(): void{
    this.isLoading = true;
    this.eventService.getProfileForm(this.editForm.idolId).subscribe(
      data => {
        if(data!=null && data.length==1){
          this.editForm = {
            formId: data[0].formId,
            gender: data[0].gender,
            bornyear: data[0].bornyear,
            location: data[0].location,
            address: data[0].address,
            idolId: data[0].idolId,
            usernameEmail: data[0].usernameEmail,
            tgId: data[0].tgId,
            tgName: data[0].tgName
          };
        }
        this.isLoading = false;
      }
    );
  }

}

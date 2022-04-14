import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../service/event.service';
import { IdolService } from '../idol.service';
import { Donation } from '../model/donation';

@Component({
  selector: 'app-donation',
  templateUrl: './donation.component.html',
  styleUrls: ['./donation.component.sass']
})
export class DonationComponent implements OnInit {

  adminAccessRight: boolean = false;
  isLoading: boolean = false;
  isUploading: boolean = false;
  infoMessages: string[] = [];
  alertMessages: string[] = [];
  filePath: string = '';
  editDonation: Donation = {
    donationId: 0,
    amount: 0,
    answer1: '',
    fileContent: '',
    fileName: '',
    filePath: '',
    fileType: '',
    idolId: 0,
    uploadBy: '',
    uploadDate: new Date()
  }

  goToReview(): void{
    this.router.navigate(['../donation-review'], {relativeTo: this.route});
  }

  backToMenu(): void{
    this.router.navigate(['../home'], {relativeTo: this.route});
  }

  onFileSelected(event: Event): void{
    this.isLoading = true;
    var fileList = (event.target as HTMLInputElement).files??new Array();
    if(fileList.length > 0){
      var file:File = fileList[0];
      if(file.size > 1024 * (1024 * 10)){
        this.alertMessages.push("上載檔案不可超過10MB");
        this.isLoading = false;
        return;
      }

      this.editDonation.fileType = file.type;
      this.editDonation.fileName = file.name;

      var reader = new FileReader();
      reader.onload = () => {
        var result = reader.result as string;
        this.editDonation.fileContent = result.toString().split(',')[1]
        this.isLoading = false;
      }
      reader.readAsDataURL(file)
    }
  }

  constructor(
    private idolService: IdolService,
    private eventService: EventService,
    private router: Router,
    private route: ActivatedRoute,
    private ngZone: NgZone) {
      this.ngZone.run(()=>{
        var usernameEmail = window.sessionStorage.getItem("usernameEmail");
        var sessionId = window.sessionStorage.getItem("sessionId");

        //admin right
        this.idolService.checkAccessRight(1, 'admin').subscribe(
          e => {
            this.adminAccessRight = e.length>0;
          }
        );

        //all
        if(usernameEmail!='' && sessionId!='' && usernameEmail!=null && sessionId!=null){
          this.router.navigate(['../donation'], {relativeTo: this.route});
        }else{
          window.sessionStorage.setItem("redirectTo", "../donation");
          this.router.navigate(['../login'], {relativeTo: this.route});
        }
      });
    }

  ngOnInit(): void {
  }

  cancelEdit(): void{
    this.reset();
  }

  reset(): void{
    this.filePath = '';
    this.editDonation = {
      donationId: 0,
      amount: 0,
      answer1: '',
      fileContent: '',
      fileName: '',
      filePath: '',
      fileType: '',
      idolId: 0,
      uploadBy: '',
      uploadDate: new Date()
    }
  }

  completeEdit(): void{
    this.isLoading = false;
    this.alertMessages.length = 0;
    if(this.editDonation.amount==0){
      this.alertMessages.push("請輸入金額");
    }
    if(this.editDonation.fileContent.length==0){
      this.alertMessages.push("請提供圖片證明");
    }

    if(this.alertMessages.length>0){
      return;
    }

    this.infoMessages = ["上載中..."];
    var usernameEmail = window.sessionStorage.getItem("usernameEmail")??'';
    this.isUploading = true;
    this.editDonation.answer1 = "我愛辣魚蛋";
    this.editDonation.idolId = 1;
    this.editDonation.uploadBy = usernameEmail;
    this.eventService.addDonation(this.editDonation).subscribe(
      data => {
        this.reset();
        window.alert("上載成功");
        this.infoMessages = ["上載成功"];
        this.isLoading = false;
        window.scrollTo(0, 0);
      }
    );

  }

}

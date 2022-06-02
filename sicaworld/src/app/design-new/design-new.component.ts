import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IdolService } from '../idol.service';
import { VideoService } from '../service/video.service';
import { DesignItem } from '../model/design-item';
import { VoteItem } from '../model/vote-item';

@Component({
  selector: 'app-design-new',
  templateUrl: './design-new.component.html',
  styleUrls: ['./design-new.component.sass']
})
export class DesignNewComponent implements OnInit {

  adminAccessRight: boolean = false;
  isRedirectToLogin: boolean = true;
  voteItem: number = 0;
  isLoading: boolean = false;
  isUploading: boolean = false;
  infoMessages: string[] = [];
  alertMessages: string[] = [];
  items: DesignItem[] = [];
  logonUsernameEmail: string = "";
  isLogon: boolean = false;
  email: string = '';
  tgId: string = '';

  editItem: DesignItem = {
    idolId: 0,
    itemId: 0,
    fileDescription: '',
    fileContent: '',
    uploadDate: new Date(),
    uploadBy: '',
    fileName: '',
    filePath: '',
    fileType: ''
  }

  gotoLogin(){
    window.sessionStorage.setItem("redirectTo", "../design-new");
    this.router.navigate(['../login'], {relativeTo: this.route});
  }

  skipLogin(){
    this.isRedirectToLogin = false;
  }

  listResult(): void{
    if(!this.adminAccessRight){
      return;
    }

    this.items = [];
    this.isLoading = true;
    this.videoService.getDesignItems(1).subscribe(
      e => {
        for(var i=0; i<e.length; i++){
          var e2: DesignItem = {
            idolId: e[i].idolId,
            itemId: e[i].itemId,
            fileName: e[i].fileName,
            fileDescription: e[i].fileDescription,
            filePath: e[i].filePath,
            fileContent: e[i].fileContent,
            uploadDate: e[i].uploadDate,
            uploadBy: e[i].uploadBy,
            fileType: e[i].fileType
          };
          this.items.push(e2);
        };
        this.isLoading = false;
      }
    );
  }

  backToMenu(): void{
    this.router.navigate(['../home'], {relativeTo: this.route});
  }

  onFileSelected(event: Event): void{
    var fileList = (event.target as HTMLInputElement).files??new Array();
    if(fileList.length > 0){
      var file:File = fileList[0];
      if(file.size > 1024 * (1024 * 20)){
        this.alertMessages.push("上載檔案不可超過20MB");
        return;
      }

      this.editItem.fileType = file.type;
      this.editItem.fileName = file.name;
      if(!this.isLogon){
        this.editItem.uploadBy = this.email + ';' + this.tgId;
      }

      var reader = new FileReader();
      reader.onload = () => {
        var result = reader.result as string;
        this.editItem.fileContent = result.toString().split(',')[1]
      }
      reader.readAsDataURL(file)
    }
  }

  constructor(
    private idolService: IdolService,
    private videoService: VideoService,
    private router: Router,
    private route: ActivatedRoute,
    private ngZone: NgZone) {
      this.ngZone.run(()=>{
        //admin right
        this.idolService.checkAccessRight(1, 'admin').subscribe(
          e => {
            this.adminAccessRight = e.length>0;
            this.listResult();
          }
        );

        var usernameEmail = window.sessionStorage.getItem("usernameEmail");
        var sessionId = window.sessionStorage.getItem("sessionId");
        if(usernameEmail!='' && sessionId!='' && usernameEmail!=null && sessionId!=null){
          this.isRedirectToLogin = false;
          this.isLogon = true;
        }
        this.router.navigate(['../design-new'], {relativeTo: this.route});
      });
    }

  ngOnInit(): void {
    this.listResult();
  }

  cancelEdit(): void{
    this.reset();
    this.listResult();
  }

  reset(): void{
    this.isUploading = false;
    this.editItem = {
      idolId: 0,
      itemId: 0,
      fileDescription: '',
      fileContent: '',
      uploadDate: new Date(),
      uploadBy: '',
      fileName: '',
      filePath: '',
      fileType: ''
    }
  }

  vote(): void{
    this.alertMessages.length = 0;
    if(this.voteItem==0){
      this.alertMessages.push("請選擇作品。");
    }

    if(this.alertMessages.length>0){
      return;
    }

    this.infoMessages = ["投票中..."];
    var usernameEmail = window.sessionStorage.getItem("usernameEmail")??'';
    this.isUploading = true;
    this.editItem.idolId = 1;
    var vi: VoteItem = {
      itemId: this.voteItem,
      createBy: usernameEmail,
      createDate: new Date(),
      idolId: 1
    };
    console.log(vi);
    this.videoService.addVoteItem(vi).subscribe(
      data => {
        this.reset();
        this.infoMessages = ["投票成功"];
        window.scrollTo(0, 0);
      }
    );
  }

  completeEdit(): void{
    this.alertMessages.length = 0;
    if(this.editItem.fileContent.length==0){
      this.alertMessages.push("請提供作品");
    }

    if(this.alertMessages.length>0){
      return;
    }

    this.infoMessages = ["上載中..."];
    var usernameEmail = window.sessionStorage.getItem("usernameEmail")??'';
    this.isUploading = true;
    this.editItem.idolId = 1;
    this.editItem.uploadBy = usernameEmail;
    this.videoService.addDesignItem(this.editItem).subscribe(
      data => {
        this.reset();
        this.infoMessages = ["上載成功"];
        window.scrollTo(0, 0);
      }
    );
  }

}

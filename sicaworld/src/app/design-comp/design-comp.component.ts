import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IdolService } from '../idol.service';
import { VideoService } from '../service/video.service';
import { DesignItem } from '../model/design-item';
import { VoteItem } from '../model/vote-item';

@Component({
  selector: 'app-design-comp',
  templateUrl: './design-comp.component.html',
  styleUrls: ['./design-comp.component.sass']
})
export class DesignCompComponent implements OnInit {

  adminRight: boolean = false;
  voteItem: number = 0;
  isLoading: boolean = false;
  isUploading: boolean = false;
  pagemode: string = 'upload';
  infoMessages: string[] = [];
  alertMessages: string[] = [];
  items: DesignItem[] = [];

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

  gotoVote():void{
    this.pagemode = 'vote';
    this.reset();
  }

  gotoUpload():void{
    this.pagemode = 'upload';
    this.reset();
  }

  listResult(): void{
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
        var usernameEmail = window.sessionStorage.getItem("usernameEmail");
        var sessionId = window.sessionStorage.getItem("sessionId");
        if(usernameEmail!='' && sessionId!='' && usernameEmail!=null && sessionId!=null){
          this.router.navigate(['../design-comp'], {relativeTo: this.route});
        }else{
          window.sessionStorage.setItem("redirectTo", "../design-comp");
          this.router.navigate(['../login'], {relativeTo: this.route});
        }
      });
    }

  ngOnInit(): void {
    this.pagemode = 'list';
    this.loadAccessRight('admin');
    this.listResult();
  }

  loadAccessRight(roleId :string): void{
    this.idolService.checkAccessRight(1, roleId).subscribe(
      e => {
        this.adminRight = e.length>0;
      }
    );
  }

  cancelEdit(): void{
    this.reset();
    this.pagemode = 'list';
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

import { Component, NgZone, OnInit } from '@angular/core';
import { Smaterial } from './smaterial';
import { ActivatedRoute, Router } from '@angular/router';
import { VideoService } from '../video.service';

@Component({
  selector: 'app-smaterial',
  templateUrl: './smaterial.component.html',
  styleUrls: ['./smaterial.component.sass']
})
export class SmaterialComponent implements OnInit {

  isLoading: boolean = false;
  isUploading: boolean = false;
  isLogon: boolean = false;
  pagemode: string = '';
  infoMessages: string[] = [];
  alertMessages: string[] = [];
  items: Smaterial[] = [];

  editMaterial: Smaterial = {
    idolId: 0,
    materialId: 0,
    tags: '',
    fileDescription: '',
    fileContent: '',
    uploadDate: new Date(),
    uploadBy: '',
    fileName: '',
    filePath: '',
    fileType: ''
  }

  gotoUpload():void{
    this.pagemode = 'upload';
    this.reset();
  }

  listResult(): void{
    this.items = [];
    this.isLoading = true;
    this.videoService.getMaterials(1).subscribe(
      e => {
        for(var i=0; i<e.length; i++){
          var e2: Smaterial = {
            idolId: e[i].idolId,
            materialId: e[i].materialId,
            fileName: e[i].fileName,
            fileDescription: e[i].fileDescription,
            filePath: e[i].filePath,
            fileContent: e[i].fileContent,
            uploadDate: e[i].uploadDate,
            uploadBy: e[i].uploadBy,
            tags: e[i].tags,
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
      if(file.size > 1024 * (1024 * 30)){
        this.alertMessages.push("上載檔案不可超過30MB");
        return;
      }

      this.editMaterial.fileType = file.type;
      this.editMaterial.fileName = file.name;

      var reader = new FileReader();
      reader.onload = () => {
        var result = reader.result as string;
        this.editMaterial.fileContent = result.toString().split(',')[1]
        // /console.log(this.editMaterial.fileContent);
      }
      reader.readAsDataURL(file)
    }
  }

  constructor(
    private videoService: VideoService,
    private router: Router,
    private route: ActivatedRoute,
    private ngZone: NgZone) {
      this.ngZone.run(()=>{
        this.router.navigate(['../material'], {relativeTo: this.route});
      });
    }

  ngOnInit(): void {
    var usernameEmail = window.sessionStorage.getItem("usernameEmail");
    var sessionId = window.sessionStorage.getItem("sessionId");
    if(usernameEmail!='' && sessionId!='' && usernameEmail!=null && sessionId!=null){
      this.isLogon = true;
    }

    this.pagemode = 'list';
    this.listResult();
  }

  cancelEdit(): void{
    this.reset();
    this.pagemode = 'list';
    this.listResult();
  }

  reset(): void{
    this.isUploading = false;
    this.editMaterial = {
      idolId: 0,
      materialId: 0,
      tags: '',
      fileDescription: '',
      fileContent: '',
      uploadDate: new Date(),
      uploadBy: '',
      fileName: '',
      filePath: '',
      fileType: ''
    }
  }

  completeEdit(): void{
    //console.log(this.editMaterial);

    this.alertMessages.length = 0;
    if(this.editMaterial.fileContent.length==0){
      this.alertMessages.push("請提供回憶");
    }

    if(this.alertMessages.length>0){
      return;
    }

    this.infoMessages = ["上載中..."];
    this.isUploading = true;
    this.editMaterial.idolId = 1;
    this.videoService.addMaterial(this.editMaterial).subscribe(
      data => {
        this.reset();
        this.infoMessages = ["上載成功"];
        window.scrollTo(0, 0);
      }
    );
  }

}

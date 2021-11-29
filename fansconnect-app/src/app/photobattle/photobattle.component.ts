import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../photo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PhotoBattle } from './photobattle';
import { Photo } from './photo';

@Component({
  selector: 'app-photobattle',
  templateUrl: './photobattle.component.html',
  styleUrls: ['./photobattle.component.sass']
})
export class PhotobattleComponent implements OnInit {

  isComplete: boolean = false;
  isUpload: boolean = false;
  currentBattle: number = 0;
  photos: Photo[] = [];
  photoBattles: PhotoBattle[] = [];
  filePath: string = '';

  constructor(
    private photoService: PhotoService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  onFileSelected(event: Event): void{
    var fileList = (event.target as HTMLInputElement).files??new Array();
    if(fileList.length > 0){
      var file:File = fileList[0];
      var reader = new FileReader();
      reader.onload = () => {
        this.filePath = reader.result as string;
        console.log(this.filePath);
      }
      reader.readAsDataURL(file)
    }
  }

  showUploadDialog(): void{
    this.isUpload = true;
  }

  cancelUpload():void{
    this.isUpload = false;
  }

  completeUpload(): void{
    this.isUpload = false;
    var newPhoto: Photo = {
      battleId: this.currentBattle,
      photoId: 0,
      imageContent: this.filePath,
      likeCount: 1
    };
    this.photoService.addPhoto(newPhoto);
    this.isComplete = true;
  }

  backToMenu(): void{
    this.router.navigate(['../home'], {relativeTo: this.route});
  }

  ngOnInit(): void {
    console.log("events init");
    this.photoService.getPhotobattles(1).subscribe(
      e => {
        for(var i=0; i<e.length; i++){
          var e2: PhotoBattle = {
            battleId: e[i].battleId,
            battleName: e[i].battleName,
            battleDescription: e[i].battleDescription,
            startDate: e[i].startDate,
            endDate: e[i].endDate
          };
          this.photoBattles.push(e2);
        }
        this.currentBattle = this.photoBattles[0].battleId;
        this.refreshPhotos();
      }
    );
  }

  addLike(photoId: number):void{
    this.photoService.addLike(photoId);
    this.isComplete = true;
  }

  getCurrentPhotoBattleName():string{
    for(var i=0; i<this.photoBattles.length; i++){
      if(this.photoBattles[i].battleId==this.currentBattle){
        return this.photoBattles[i].battleName;
      }
    }
    return '';
  }

  refreshPhotos(): void{
    this.photoService.getPhotos(this.currentBattle).subscribe(
      e => {
        for(var i=0; i<e.length; i++){
          var e2: Photo = {
            battleId: e[i].battleId,
            photoId: e[i].photoId,
            imageContent: e[i].imageContent,
            likeCount: e[i].likeCount
          };
          this.photos.push(e2);
        }
      }
    );
  }
}

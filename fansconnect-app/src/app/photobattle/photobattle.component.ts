import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../photo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PhotoBattle } from './photobattle';

@Component({
  selector: 'app-photobattle',
  templateUrl: './photobattle.component.html',
  styleUrls: ['./photobattle.component.sass']
})
export class PhotobattleComponent implements OnInit {

  isUpload: boolean = false;
  currentBattle: number = 0;
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

  completeUpload(): void{
    this.isUpload = false;
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
      }
    );
  }
}

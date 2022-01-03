import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SupportitemService } from '../supportitem.service';
import { Shopitem } from './shopitem';

@Component({
  selector: 'app-shop-item-edit',
  templateUrl: './shop-item-edit.component.html',
  styleUrls: ['./shop-item-edit.component.sass']
})
export class ShopItemEditComponent implements OnInit {

  editItem: Shopitem = {
    idolId: 1,
    itemId: 0,
    itemName: '',
    itemDescription: '',
    createDate: new Date(),
    createBy: '',
    fileContent: '',
    fileType: '',
    fileName: '',
    filePath: '',
    price: 0,
    startDate: (new Date()).toISOString().substring(0,10),
    expiryDate: ''
  };

  isUploading: boolean = false;
  pagemode: string = '';
  infoMessages: string[] = [];
  alertMessages: string[] = [];

  constructor(
    private itemService: SupportitemService,
    private router: Router,
    private route: ActivatedRoute,
    private ngZone: NgZone) {
    this.ngZone.run(()=>{
      this.router.navigate(['../shopItemEdit'], {relativeTo: this.route});
    });
  }

  ngOnInit(): void {
  }

  completeEdit(): void{
    this.alertMessages.length = 0;

    if(this.alertMessages.length>0){
      return;
    }

    this.infoMessages = ["上載中..."];
    this.isUploading = true;
    this.editItem.idolId = 1;
    this.itemService.addShopItem(this.editItem).subscribe(
      data => {
        this.reset();
        this.infoMessages = ["上載成功"];
        window.scrollTo(0, 0);
      }
    );
  }

  cancelEdit(): void{
    this.reset();
    this.pagemode = 'add';
  }

  backToMenu(): void{
    this.router.navigate(['../home'], {relativeTo: this.route});
  }

  reset(): void{
    this.editItem = {
      idolId: 1,
      itemId: 0,
      itemName: '',
      itemDescription: '',
      createDate: new Date(),
      createBy: '',
      fileContent: '',
      fileType: '',
      fileName: '',
      filePath: '',
      price: 0,
      startDate: (new Date()).toISOString().substring(0,10),
      expiryDate: ''
    };
  }

  onFileSelected(event: Event): void{
    var fileList = (event.target as HTMLInputElement).files??new Array();
    if(fileList.length > 0){
      var file:File = fileList[0];
      if(file.size > 1024 * (1024 * 10)){
        this.alertMessages.push("上載檔案不可超過10MB");
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

}

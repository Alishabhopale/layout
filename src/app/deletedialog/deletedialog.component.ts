import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/service/api.service';
import { ProdapiService } from 'src/service/prodapi.service';

@Component({
  selector: 'app-deletedialog',
  templateUrl: './deletedialog.component.html',
  styleUrls: ['./deletedialog.component.scss']
})
export class DeletedialogComponent {
  datasource: any=[];

  constructor(private api: ApiService,
    private prodapi : ProdapiService,
    @Inject(MAT_DIALOG_DATA) public openDeleteDialog:any){}

    ngOnInit(){
      // this.getCatgory()
    }
  getCatgory(){
    this.api.getCategory()
    .subscribe((res)=>{
      this.datasource = res;
      console.log(this.datasource);
    })
    
  }

  onDeleteCategory(row:any){
    this.api.deleteCategory(this.openDeleteDialog.id)
    .subscribe((res)=>{
      console.log(this.openDeleteDialog.id,'res')
      window.location.reload();
      this.getCatgory();
    })
  }
}

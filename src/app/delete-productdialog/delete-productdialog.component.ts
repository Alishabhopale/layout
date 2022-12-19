import { Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProdapiService } from 'src/service/prodapi.service';

@Component({
  selector: 'app-delete-productdialog',
  templateUrl: './delete-productdialog.component.html',
  styleUrls: ['./delete-productdialog.component.scss']
})
export class DeleteProductdialogComponent {
  datasource: any=[];

  constructor(private prodapi:ProdapiService,
    @Inject(MAT_DIALOG_DATA) public openDeleteProductDialog:any){}
    

  getProd(){
    this.prodapi.getProduct()
    .subscribe((res)=>{
      this.datasource = res;
      console.log(this.datasource);
    })
  }
  
  onDeleteProduct(row:any){
    this.prodapi.deleteProduct(this.openDeleteProductDialog.id)
    .subscribe((res)=>{
      console.log(this.openDeleteProductDialog.id,'res')
      this.getProd();
    })
  }
}

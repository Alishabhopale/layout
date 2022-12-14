import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/service/api.service';
import { ProdapiService } from 'src/service/prodapi.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-dialog-product',
  templateUrl: './dialog-product.component.html',
  styleUrls: ['./dialog-product.component.scss']
})
export class DialogProductComponent {
  productData : any = [];
  productForm !: FormGroup;
  actionBtn : string = "Save";
  data: any;
  constructor(
    private api : ApiService,
    private proapi:ProdapiService,
    private formbuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef : MatDialogRef<DialogComponent>){
  }
  ngOnInit() :void{
    this.productForm = this.formbuilder.group({
      productName : ['', Validators.required],
      category: ['',Validators.required],
      price : ['',Validators.required],
      description : ['', Validators.required]
    });

    if(this.editData){
      this.actionBtn = "Update";
      this.productForm.controls['productName'].setValue(this.editData.productName);
      this.productForm.controls['category'].setValue(this.editData.category);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['description'].setValue(this.editData.description);

    }
  }
  addProduct(){
   if(!this.editData){
    if(this.productForm.valid){
      this.proapi.postProduct(this.productForm.value)
      .subscribe({
        next:(res)=>{
          alert("Product Added")
          this.productForm.reset();
          this.dialogRef.close('save');
        },
        error:()=>{
          alert("Something went wrong")
        }
      })
    }
   }else{
    this.updateProduct()
   }
  }
  updateProduct(){
    this.proapi.updateProduct(this.productForm.value,this.editData.id)
    .subscribe({
      next:(res)=>{
        alert("Category updated");
        this.productForm.reset();
        this.dialogRef.close('update');
      },
      error:()=>{
        alert("Something went wrong");
      }
    })
  }
  selectCategory(){
    this.api.getCategory()
    .subscribe(
      (data) => {
        this.data = data;
       }
    )
  }
}

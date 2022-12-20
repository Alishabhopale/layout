import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/service/api.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  categoryData : any = [];
  category : any;
  categoryForm !: FormGroup;
  actionBtn : string = "Save";
  isAdded : boolean = false;
  constructor(
    private api:ApiService,
    private formbuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef : MatDialogRef<DialogComponent>){
    
  }
  ngOnInit() :void{
    this.categoryForm = this.formbuilder.group({
      categoryName : ['', Validators.required]
    });

    if(this.editData){
      this.actionBtn = "Update";
      this.categoryForm.controls['categoryName'].setValue(this.editData.categoryName);
    }
  }
  addProduct(){
   if(!this.editData){
    if(this.categoryForm.valid){
      this.api.postCategory(this.categoryForm.value)
      .subscribe({
        next:(res)=>{
          alert("Category Added")
          this.categoryForm.reset();
          this.dialogRef.close('save');
        },
        error:()=>{
          alert("Something went wrong")
        }
      })
    }
   }else{
    this.updateCategory()
   }
  }
  updateCategory(){
    this.api.updateCategory(this.categoryForm.value,this.editData.id)
    .subscribe({
      next:(res)=>{
        alert("Category updated");
        this.categoryForm.reset();
        this.dialogRef.close('update');
      },
      error:()=>{
        alert("Something went wrong");
      }
    })
  }
}


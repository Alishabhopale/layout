import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/service/api.service';
import { FormBuilder } from '@angular/forms';
import { DialogComponent } from '../dialog/dialog.component';
import { DialogRef } from '@angular/cdk/dialog';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
@Component({
  selector: 'app-manage-category',
  templateUrl: './manage-category.component.html',
  styleUrls: ['./manage-category.component.scss']
})
export class ManageCategoryComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name','actions'];
  dataSource! : MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog,
    private api:ApiService,
   private formbuilder: FormBuilder) {}

  ngOnInit(): void {
    this.getAllCategories();
  }
  openDialog(){
    this.dialog.open(DialogComponent).afterClosed()
    .subscribe(val=>{
      if(val === 'save'){
        this.getAllCategories();
      }
    })
  } 
  getAllCategories(){
    this.api.getCategory()
    .subscribe({
      next:(res)=>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error:(err)=>{
        alert("Error while fetching records")
      }
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editCategory(row:any){
    this.dialog.open(DialogComponent,{
      data:row
    }).afterClosed().subscribe(val=>{
      if(val==='update'){
        this.getAllCategories();
      }
    })
  }
  deleteCategory(id:any){
    this.api.deleteCategory(id)
    .subscribe({
      next:(res)=>{
        alert("Deleted successfully");
        this.getAllCategories();
      },
      error:()=>{
        alert("Something went wrong");
      }
    })
  }
}

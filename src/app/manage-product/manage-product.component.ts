import { Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProdapiService } from 'src/service/prodapi.service';
import { DialogProductComponent } from '../dialog-product/dialog-product.component';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.scss']
})
export class ManageProductComponent {

  displayedColumns: string[] = ['id','name','price','description','actions'];
  dataSource! : MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog,
    private proapi:ProdapiService,
   private formbuilder: FormBuilder) {}

   ngOnInit(): void {
    this.getAllProducts();
  }

  openDialog(){
    this.dialog.open(DialogProductComponent).afterClosed()
    .subscribe(val=>{
      if(val === 'save'){
        this.getAllProducts();
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
   getAllProducts(){
    this.proapi.getProduct()
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
  editProduct(row:any){
    this.dialog.open(DialogProductComponent,{
      data:row
    }).afterClosed().subscribe(val=>{
      if(val==='update'){
        this.getAllProducts();
      }
    })
  }
  deleteProduct(id:any){
    this.proapi.deleteProduct(id)
    .subscribe({
      next:(res)=>{
        alert("Deleted successfully");
        this.getAllProducts();
      },
      error:()=>{
        alert("Something went wrong");
      }
    })
  }
}

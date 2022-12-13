import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageCategoryComponent } from './manage-category/manage-category.component';
import { ManageProductComponent } from './manage-product/manage-product.component';

const routes: Routes = [
  {
    path:'ManageCategory',
    component:ManageCategoryComponent
  },
  {
    path:'ManageProduct',
    component:ManageProductComponent
  },
  {
    path:'Dashboard',
    component:DashboardComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

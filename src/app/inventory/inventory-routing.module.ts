import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandComponent } from './brand/brand.component';
import { CategoryComponent } from './category/category.component';
import { GroupComponent } from './group/group.component';

const routes: Routes = [
  { path: 'brand', component: BrandComponent },
  { path: 'group', component: GroupComponent },
  { path: 'category', component: CategoryComponent },
  { path: '', pathMatch: 'full', redirectTo: 'brand' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InventoryRoutingModule {}

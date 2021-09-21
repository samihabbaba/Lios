import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandComponent } from './brand/brand.component';
import { CategoryComponent } from './category/category.component';
import { GroupComponent } from './group/group.component';
import { InventoryComponent } from './inventory.component';

const routes: Routes = [
  { path: '', redirectTo: 'brand', pathMatch: 'full' },
  { path: 'brand', component: BrandComponent },
  { path: 'group', component: GroupComponent },
  { path: 'category', component: CategoryComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InventoryRoutingModule {}

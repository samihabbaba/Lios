import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventoryRoutingModule } from './inventory-routing.module';
import { InventoryComponent } from './inventory.component';
import { SharedModule } from '../shared/shared.module';
import { BrandComponent } from './brand/brand.component';
import { GroupComponent } from './group/group.component';
import { CategoryComponent } from './category/category.component';


@NgModule({
  declarations: [
    InventoryComponent,
    BrandComponent,
    GroupComponent,
    CategoryComponent
  ],
  imports: [
    CommonModule,
    InventoryRoutingModule,
    SharedModule
  ]
})
export class InventoryModule { }

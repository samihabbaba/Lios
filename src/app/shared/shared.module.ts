import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MenuModule } from 'primeng/menu';
import { SidebarModule } from 'primeng/sidebar';
import { MegaMenuModule } from 'primeng/megamenu';
import { NavbarComponent } from './navbar/navbar.component';
import { CardModule } from 'primeng/card';

@NgModule({
  declarations: [ToolbarComponent, NavbarComponent],
  imports: [
    CommonModule,
    ToolbarModule,
    ButtonModule,
    MenuModule,
    SidebarModule,
    MegaMenuModule,
    CardModule,
  ],
  exports: [
    ToolbarModule,
    ToolbarComponent,
    ButtonModule,
    MenuModule,
    SidebarModule,
    MegaMenuModule,
    NavbarComponent,
    CardModule,
  ],
})
export class SharedModule {}

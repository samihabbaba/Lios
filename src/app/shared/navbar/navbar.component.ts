import { Component, OnInit } from '@angular/core';
import { MegaMenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  navItems: MenuItem[];

  constructor() {}

  ngOnInit(): void {
    this.navItems = [
      {
        label: 'Dashboard',
        icon: 'pi pi-home',
        isActive: true,
        toggled: false,
      },

      {
        label: 'Users',
        icon: 'pi pi-users',
        isActive: false,
        toggled: false,
        children: [
          { label: 'Agency Users', icon: 'pi pi-user-plus' },
          { label: 'Captain Users', icon: 'pi pi-shield' },
          { label: 'Local Users', icon: 'pi pi-user' },
        ],
      },
      {
        label: 'Inventory',
        icon: 'pi pi-briefcase',
        isActive: false,
        toggled: false,
        children: [
          { label: 'Brand', icon: '' },
          { label: 'Group', icon: '' },
          { label: 'Category', icon: '' },
        ],
      },
    ];
  }


  toggleNavItem(item: MenuItem) {
    item.toggled = !item.toggled;
  }
}

export interface MenuItem {
  label: string;
  icon?: string;
  isActive: boolean;
  toggled: boolean;
  children?: any[];
}

import { Component, OnInit } from '@angular/core';
import { MegaMenuItem } from 'primeng/api';
import { MenuItem } from 'src/app/models/menuItem';

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
        route: 'dashboard',
      },

      {
        label: 'Users',
        icon: 'pi pi-users',
        isActive: false,
        toggled: false,
        children: [
          {
            label: 'Agency Users',
            icon: 'pi pi-user-plus',
            route: 'users/agency',
          },
          {
            label: 'Captain Users',
            icon: 'pi pi-shield',
            route: 'users/captain',
          },
          { label: 'Local Users', icon: 'pi pi-user', route: 'users/local' },
        ],
      },
      {
        label: 'Inventory',
        icon: 'pi pi-briefcase',
        isActive: false,
        toggled: false,
        children: [
          { label: 'Brand', icon: '', route: 'inventory/brand' },
          { label: 'Group', icon: '', route: 'inventory/group' },
          { label: 'Category', icon: '', route: 'inventory/category' },
        ],
      },

      {
        label: 'Ships',
        icon: '',
        isActive: false,
        toggled: false,
        route: '/ships',
      },

      {
        label: 'Ship Registry',
        icon: '',
        isActive: false,
        toggled: false,
        route: '/ship-registry',
      },

      {
        label: 'Trips',
        icon: '',
        isActive: false,
        toggled: false,
        route: '/trips',
      },

      {
        label: 'Crane',
        icon: '',
        isActive: false,
        toggled: false,
        route: '/crane',
      },

      {
        label: 'Manual Payment',
        icon: '',
        isActive: false,
        toggled: false,
        route: '/manual-payment',
      },

      {
        label: 'Configuration',
        icon: '',
        isActive: false,
        toggled: false,
        children: [
          { label: 'Discount', icon: '', route: 'configuration/discount' },
          { label: 'Services', icon: '', route: 'configuration/services' },
          { label: 'Port', icon: '', route: 'configuration/port' },
          { label: 'Holiday', icon: '', route: 'configuration/holiday' },
        ],
      },
    ];
  }

  toggleNavItem(item: MenuItem) {
    item.toggled = !item.toggled;
  }
}

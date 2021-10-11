import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MegaMenuItem } from 'primeng/api';
import { MenuItem } from 'src/app/models/menuItem';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  navItems: MenuItem[];

  constructor(public router: Router) {}

  ngOnInit(): void {
    this.navItems = [
      {
        label: 'Dashboard',
        icon: 'fas fa-home',
        isActive: true,
        toggled: false,
        route: '/dashboard',
      },

      {
        label: 'Users',
        icon: 'fas fa-users',
        isActive: false,
        toggled: false,
        children: [
          {
            label: 'Agency',
            icon: 'fas fa-user-tie',
            route: '/users/agency',
          },
          {
            label: 'Captain',
            icon: 'fas fa-user-shield',
            route: '/users/captain',
          },
          {
            label: 'Local',
            icon: 'fas fa-street-view',
            route: '/users/local',
          },
        ],
      },
      {
        label: 'Inventory',
        icon: 'fas fa-dolly-flatbed',
        isActive: false,
        toggled: false,
        children: [
          {
            label: 'Brand',
            icon: 'fas fa-certificate',
            route: '/inventory/brand',
          },
          {
            label: 'Group',
            icon: 'fas fa-layer-group',
            route: '/inventory/group',
          },
          {
            label: 'Category',
            icon: 'fas fa-list-ul',
            route: '/inventory/category',
          },
        ],
      },

      {
        label: 'Ships',
        icon: 'fas fa-ship',
        isActive: false,
        toggled: false,
        route: '/ships',
      },

      {
        label: 'Ship Registry',
        icon: 'fas fa-passport',
        isActive: false,
        toggled: false,
        route: '/ship-registry',
      },

      {
        label: 'Trips',
        icon: 'fas fa-route',
        isActive: false,
        toggled: false,
        route: '/trips',
      },

      {
        label: 'Crane',
        icon: 'fas fa-wrench',
        isActive: false,
        toggled: false,
        children: [
          {
            label: 'Pending',
            icon: 'fas fa-hand-holding-usd',
            route: '/crane/pending',
          },
          {
            label: 'History',
            icon: 'fas fa-history',
            route: '/crane/history',
          },
        ],
      },

      {
        label: 'Manual Payment',
        icon: 'fas fa-money-bill-wave',
        isActive: false,
        toggled: false,
        route: '/manual-payment',
      },

      {
        label: 'Configuration',
        icon: 'fas fa-cogs',
        isActive: false,
        toggled: false,
        children: [
          {
            label: 'Discount',
            icon: 'fas fa-percentage',
            route: '/configuration/discount',
          },
          {
            label: 'Services',
            icon: 'fas fa-concierge-bell',
            route: '/configuration/services',
          },
          {
            label: 'Port',
            icon: 'fas fa-map-marker-alt',
            route: '/configuration/port',
          },
          {
            label: 'Holiday',
            icon: 'fas fa-gift',
            route: '/configuration/holiday',
          },
        ],
      },
    ];
  }

  toggleNavItem(item: MenuItem) {
    item.toggled = !item.toggled;
  }

  // goToPage(item: MenuItem) {
  //   if (item.children) {
  //     return;
  //   } else {
  //     this.router.navigate([item.route]);
  //   }
  // }
}

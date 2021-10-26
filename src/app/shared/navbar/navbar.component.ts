import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MegaMenuItem } from 'primeng/api';
import { MenuItem } from 'src/app/models/menuItem';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  navItems: MenuItem[];
  isTurkish: boolean = false;

  constructor(
    public router: Router,
    public authService: AuthService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    // console.log(localStorage.getItem('language'));
    if (localStorage.getItem('language') === 'tr') {
      this.isTurkish = true;
    }
    // console.log(this.translate.getDefaultLang());
    this.navItems = [
      {
        label: 'Dashboard',
        icon: 'fas fa-home',
        isActive: true,
        toggled: false,
        route: '/dashboard',
        visible: ['Admin', 'Accountant', 'Registry', 'Collection'],
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
        visible: ['Admin', 'Accountant'],
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
        visible: ['Admin', 'Accountant'],
      },

      {
        label: 'Ships',
        icon: 'fas fa-ship',
        isActive: false,
        toggled: false,
        route: '/ships',
        visible: ['Admin', 'Accountant'],
      },

      {
        label: 'Ship Registry',
        icon: 'fas fa-passport',
        isActive: false,
        toggled: false,
        route: '/ship-registry',
        visible: ['Admin', 'Registry'],
      },

      {
        label: 'Trips',
        icon: 'fas fa-route',
        isActive: false,
        toggled: false,
        route: '/trips',
        children: [
          {
            label: 'Pending',
            icon: 'fas fa-search-dollar',
            route: '/trips/pending',
          },
          {
            label: 'History',
            icon: 'fas fa-hourglass-end',
            route: '/trips/history',
          },
        ],
        visible: ['Admin', 'Accountant', 'Registry', 'Collection'],
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
        visible: ['Admin', 'Accountant', 'Collection'],
      },

      {
        label: 'Manual Payment',
        icon: 'fas fa-money-bill-wave',
        isActive: false,
        toggled: false,
        route: '/manual-payment',
        visible: ['Admin', 'Collection'],
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
          {
            label: 'Loggings',
            icon: 'fas fa-users-cog',
            route: '/configuration/loggings',
          },
        ],
        visible: ['Admin'],
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

  checkVisibility(item: MenuItem) {
    // debugger;
    // console.log(item.visible.includes(this.authService.currentUser.role))
    return item.visible.includes(this.authService.currentUser.role);
  }
}

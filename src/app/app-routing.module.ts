import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },

  {
    path: 'users',
    loadChildren: () =>
      import('./users/users.module').then((m) => m.UsersModule),
    canLoad: [AuthGuard],
  },

  {
    path: 'trips',
    loadChildren: () =>
      import('./trips/trips.module').then((m) => m.TripsModule),
    canLoad: [AuthGuard],
  },

  {
    path: 'ships',
    loadChildren: () =>
      import('./ships/ships.module').then((m) => m.ShipsModule),
    canLoad: [AuthGuard],
  },

  {
    path: 'ship-registry',
    loadChildren: () =>
      import('./ship-registry/ship-registry.module').then(
        (m) => m.ShipRegistryModule
      ),
    canLoad: [AuthGuard],
  },

  {
    path: 'payment',
    loadChildren: () =>
      import('./manual-payment/manual-payment.module').then(
        (m) => m.ManualPaymentModule
      ),
    canLoad: [AuthGuard],
  },

  {
    path: 'inventory',
    loadChildren: () =>
      import('./inventory/inventory.module').then((m) => m.InventoryModule),
    canLoad: [AuthGuard],
  },

  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
    canLoad: [AuthGuard],
  },

  {
    path: 'crane',
    loadChildren: () =>
      import('./crane/crane.module').then((m) => m.CraneModule),
    canLoad: [AuthGuard],
  },

  {
    path: 'configuration',
    loadChildren: () =>
      import('./configuration/configuration.module').then(
        (m) => m.ConfigurationModule
      ),
    canLoad: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

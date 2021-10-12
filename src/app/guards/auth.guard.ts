import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { DataService } from '../services/data/data.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad {
  jwtHelper = new JwtHelperService();

  constructor(
    private authService: AuthService,
    private dataService: DataService,
    private router: Router
  ) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.authService.loggedIn()) {
      if (!this.authService.currentUser)
        this.authService.currentUser = this.jwtHelper.decodeToken(
          localStorage.getItem('token')?.toString()
        );
      this.authService.setUserAccess(this.authService.currentUser);
      return true;
    } else {
      this.router.navigate(['/auth/login']);
      return false;
    }
  }
}

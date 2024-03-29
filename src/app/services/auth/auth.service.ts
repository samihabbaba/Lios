import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DataService } from '../data/data.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient, private dataService: DataService) {}

  decodedToken: any;
  jwtHelper = new JwtHelperService();

  currentUser = this.jwtHelper.decodeToken(
    localStorage.getItem('token')?.toString()
  );


  realLogin(email: string, password: string): Observable<any> {
    if (!email || !password) {
      return of(null);
    }
    const model = {
      username: email,
      password: password,
    };
    return this.http.post(environment.apiUrl + 'auth/login', model).pipe(
      map((response: any) => {
        const user = response;
        if (user.token) {
          localStorage.setItem('token', user.token);
          this.dataService.currentUser.token = user.token;
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
          this.dataService.currentUser.name = this.decodedToken.name;
          this.dataService.currentUser.currency = this.decodedToken.currency;
          this.dataService.currentUser.symbol = this.decodedToken.symbol;
          this.dataService.currentUser.master = this.decodedToken.master;
          this.dataService.currentUser.agency = this.decodedToken.agency;
          this.dataService.currentUser.role = this.decodedToken.role;
          this.dataService.currentUser.id = this.decodedToken.id;

          this.dataService.httpOptions = {
            headers: new HttpHeaders({
              Authorization: 'Bearer ' + user.token,
            }),
          };
          return user;
        } else {
          return null;
        }
      })
    );
  }

  loggedIn() {
    const token: any = localStorage.getItem('token');
    if (token) {
      return !this.jwtHelper.isTokenExpired(token);
    } else {
      return false;
    }
  }

  setUserAccess(user) {
    if (user && user.role && !user.access) {
      if (user.role === 'Admin') {
        user.access = [
          'dashboard',
          'users',
          'trips',
          'ships',
          'ship-registry',
          'manual-payment',
          'inventory',
          'crane',
          'configuration',
        ];
      }

      if (user.role === 'Accountant') {
        user.access = [
          'dashboard',
          'users',
          'trips',
          'ships',
          'inventory',
          'crane',
        ];
      }

      if (user.role === 'Registry') {
        user.access = ['dashboard', 'trips', 'ship-registry'];
      }

      if (user.role === 'Collection') {
        user.access = ['dashboard', 'trips', 'manual-payment', 'crane'];
      }
      // console.log(this.currentUser);
    }
  }
}

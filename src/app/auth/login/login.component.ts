import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  passwordMasked: boolean = true;

  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router,
    private dataService: DataService
  ) {}

  ngOnInit(): void {}

  maskPassword() {
    this.passwordMasked = !this.passwordMasked;
  }

  login() {
    this.authService.realLogin(this.email, this.password).subscribe(
      (resp) => {
        if (!resp) {
          this.messageService.add({
            severity: 'error',
            summary: 'Hata',
            detail: 'Giriş bilgileri yanlış',
          });
        } else {
          this.router.navigate(['/dashboard']);
        }
      },
      (err) =>
        this.messageService.add({
          severity: 'error',
          summary: 'Hata',
          detail: 'Bir hata oluştu',
        })
    );
  }
}

import {Component,OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  credentials = {email: '', password: ''};
  private currentUserSubject = new BehaviorSubject<any>(null);
  error = '';
  submitted = false;
  loading = false;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    var user = JSON.parse(localStorage.getItem('user') || '{}');
    this.authService.handleRedirect(user);
  }


  login() {
    this.submitted = true;
    this.loading = true;
    this.error = '';

    this.authService.login(this.credentials)
      .subscribe(
        (response: any) => {
          this.loading = false;
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', JSON.stringify(response.data.user));
          this.currentUserSubject.next(response.data.user);
          setTimeout(() => {
            this.authService.handleRedirect(response.data.user);
          }, 500);
        },
        (err: any) => {
          if (err.error.message) this.error = err.error.message;
          else this.error = 'Something went wrong!';
          this.submitted = false;
          this.loading = false;
        }
      );
  }
}

import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {RoleModel} from '../../../models/role.model';
import {BehaviorSubject} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  user = {email: '', password: '', userName: '', roleId: ''};
  roles: RoleModel[] = []
  private currentUserSubject = new BehaviorSubject<any>(null);

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.authService.getRoles().subscribe((data: any) => {
      this.roles = data.data;
    });
    var user = JSON.parse(localStorage.getItem('user') || '{}');
  }

  register() {

    this.authService.register(this.user)
      .subscribe(
        (response: any) => {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', JSON.stringify(response.data.user));
          this.currentUserSubject.next(response.data.user);
          setTimeout(() => {
            this.authService.handleRedirect(response.data.user);
          }, 500);
        },
        (err: any) => {
          if (err.error.message) alert(err.error.message);
          else alert('Something went wrong!');
        }
      );
  }

}

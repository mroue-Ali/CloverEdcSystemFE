import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private currentUserSubject = new BehaviorSubject<any>(null);
  currentUser = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}
  currentUserValue() {
    return this.currentUserSubject.value;
  }
  login(credentials: any) {
    return this.http.post<any>(`${this.apiUrl}auth/login`, credentials);

  }

  register(user: any) {
    return this.http.post(`${this.apiUrl}auth/register`, user);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  getRole() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user?.role?.name || '';
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
  getRoles() {
    return this.http.get(`${this.apiUrl}role`);
  }
  handleRedirect(user: any) {
    var role = user?.role?.name || '';
    if (role == 'Admin') {
      this.router.navigate(['/home']);
    } else if (role == 'SuperAdmin') {
      this.router.navigate(['/home']);
    }else {
      this.router.navigate(['/home']);
    }
    // else {
    //   this.router.navigate(['/guest']);
    // }
  }
}

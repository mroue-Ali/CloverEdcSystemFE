import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token'); // Get token from local storage
    if (token) {
      // Clone the request to add the authorization header
      const clonedRequest = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}` // Send token as Bearer
        }
      });
      return next.handle(clonedRequest); // Send the cloned request
    }
    return next.handle(req); // Send the original request if no token
  }
}

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CrfService {
  private apiUrl = environment.apiUrl;
  private baseRoute = "crf";
  private currentUserSubject = new BehaviorSubject<any>(null);
  currentUser = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
  }

  getAll(size: number, pageIndex: number,keyword : string): Observable<any> {
    return this.http.get(
      `${this.apiUrl}${this.baseRoute}?size=${size}&offset=${pageIndex}&keyword=${keyword}`
    );
  }

  getAllByStudy(id:number,size: number, pageIndex: number,keyword : string): Observable<any> {
    return this.http.get(
      `${this.apiUrl}${this.baseRoute}/site/:${id}?size=${size}&offset=${pageIndex}&keyword=${keyword}`
    );
  }
  getAllByCrc(id:number,size: number, pageIndex: number,keyword : string): Observable<any> {
    return this.http.get(
      `${this.apiUrl}${this.baseRoute}/crc/:${id}?size=${size}&offset=${pageIndex}&keyword=${keyword}`
    );
  }




  add(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}${this.baseRoute}`, data);
  }

  edit(data: any, id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}${this.baseRoute}/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${this.baseRoute}/${id}`);
  }
}

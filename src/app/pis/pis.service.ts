import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PisService {
  private apiUrl = environment.apiUrl;
  private baseRoute = "pi";
  private currentUserSubject = new BehaviorSubject<any>(null);
  currentUser = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
  }

  getAll(size: number, pageIndex: number,keyword : string): Observable<any> {
    return this.http.get(
      `${this.apiUrl}${this.baseRoute}?size=${size}&offset=${pageIndex}&keyword=${keyword}`
    );
  }
  // getAllSites(studyId:number,size: number, pageIndex: number,keyword : string): Observable<any> {
  getAllSites(studyId:number): Observable<any> {
    return this.http.get(
      `${this.apiUrl}site/${studyId}/study`
    );
  }
  getAllByStudyId(studyId:number,size: number, pageIndex: number,keyword : string): Observable<any> {
    return this.http.get(
      `${this.apiUrl}${this.baseRoute}/${studyId}/study?size=${size}&offset=${pageIndex}&keyword=${keyword}`
    );
  }
   getAllBySiteId(siteId:number,size: number, pageIndex: number,keyword : string): Observable<any> {
    return this.http.get(
      `${this.apiUrl}${this.baseRoute}/${siteId}/site?size=${size}&offset=${pageIndex}&keyword=${keyword}`
    );
  }

  add(data: any,studyId : number): Observable<any> {
    return this.http.post(`${this.apiUrl}${this.baseRoute}/${studyId}/study`, data);
  }

  addAdmin(data: any,studyId : number): Observable<any> {

    return this.http.post(`${this.apiUrl}${this.baseRoute}/${studyId}/admin`, data);
  }
  edit(data: any, id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}${this.baseRoute}/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${this.baseRoute}/${id}`);
  }
}

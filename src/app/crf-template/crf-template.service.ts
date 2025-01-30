import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {BehaviorSubject, Observable} from 'rxjs';
import {CrfField} from '../../models/crfField.model';
import {BaseField} from '../../models/BaseField.model';

@Injectable({
  providedIn: 'root',
})
export class CrfTemplateService {
  private apiUrl = environment.apiUrl;
  private baseRoute = "crfTemplate";
  private currentUserSubject = new BehaviorSubject<any>(null);
  currentUser = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
  }

  deleteFile(fileId: string, type: 'soft' | 'actual'): Observable<void> {
    const endpoint = type === 'soft'
      ? `${this.apiUrl}${this.baseRoute}/file/${fileId}/soft-delete`
      : `${this.apiUrl}${this.baseRoute}/file/${fileId}/actual-delete`;
    return this.http.delete<void>(endpoint);
  }
  getTemplateByStudyId(studyId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}${this.baseRoute}/${studyId}/template`);
  }
  getTemplateFiles(templateId: any): Observable<any> {
    return this.http.get(`${this.apiUrl}${this.baseRoute}/${templateId}/files`);
  }
  addFileToTemplate(templateId: any, data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}crfFile/${templateId}/file`, data);
  }
  addSubFileToTemplate(templateId: any, data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}crfFile/${templateId}/subFile`, data);
  }
  // deleteFile(fileId: any): Observable<any> {
  //   return this.http.delete(`${this.apiUrl}${this.baseRoute}/file/${fileId}`);
  // }
  addBaseFieldAndLinkItToFile(fileId: any, data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}${this.baseRoute}/file/${fileId}/baseField`, data);
  }
  linkExistingFieldToFile(fileId: any, data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}${this.baseRoute}/file/${fileId}/linkField`, data);
  }

  //add field to file
  getFieldsByFileId(fileId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}crfField/file/${fileId}`);

  }

  getBaseFieldsByCrfTemplateId(crfTemplateId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}baseField/crftemplate/${crfTemplateId}`);
  }

  linkBaseFieldToFile(payload:any): Observable<any> {
    return this.http.post(`${this.apiUrl}crfField/addFieldToFile`, payload);
  }
  createBaseField(payload:any): Observable<any> {
    return this.http.post(`${this.apiUrl}basefield`, payload);
  }

}

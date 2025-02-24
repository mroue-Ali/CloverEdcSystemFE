import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { SidebarComponent } from './core/sidebar/sidebar.component';
import { HomeComponent } from './home/home.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RolesComponent } from './roles/roles.component';
import {SharedModule} from './shared/shared.module';
import { UsersComponent } from './users/users.component';
import {AuthInterceptorService} from './auth/auth-interceptor.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { UserDialogComponent } from './users/user-dialog/user-dialog.component';
import { StudiesComponent } from './studies/studies.component';
import {StudyDialogComponent} from './studies/studie-dialog/study-dialog.component';
import {ProtocolDialogComponent} from './protocols/protocol-dialog/protocol-dialog.component';
import {ProtocolsComponent} from './protocols/protocols.component';
import { StudyComponent } from './study/study.component';
import { CrfTemplateComponent } from './crf-template/crf-template.component';
import { SitesComponent } from './sites/sites.component';
import { PisComponent } from './pis/pis.component';
import { CrcsComponent } from './crcs/crcs.component';
import { DmsComponent } from './dms/dms.component';
import {SiteDialogComponent} from './sites/site-dialog/site-dialog.component';
import {PiDialogComponent} from './pis/pi-dialog/pi-dialog.component';
import {CrcDialogComponent} from './crcs/crc-dialog/crc-dialog.component';
import {RoleDialogComponent} from './roles/role-dialog/role-dialog.component';
import {MatIconModule} from '@angular/material/icon';
import {MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { CrfFileComponent } from './crf-file/crf-file.component';
import { AddFieldComponent } from './add-field/add-field.component';
import { FieldsSidebarComponent } from './fields-sidebar/fields-sidebar.component';
import {MatTable} from '@angular/material/table';
import { CrfFieldConfigModalComponent } from './crf-template/crf-field-config-modal/crf-field-config-modal.component';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import { AddBaseFieldModalComponent } from './crf-template/add-base-field-modal/add-base-field-modal.component';
import { CrfComponent } from './crf/crf.component';
import { PatientComponent } from './patient/patient.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    SidebarComponent,
    HomeComponent,
    RolesComponent,
    UsersComponent,
    UserDialogComponent,
    StudiesComponent,
    StudyDialogComponent,
    ProtocolDialogComponent,
    ProtocolsComponent,
    StudyComponent,
    CrfTemplateComponent,
    SitesComponent,
    PisComponent,
    CrcsComponent,
    DmsComponent,
    SiteDialogComponent,
    PiDialogComponent,
    CrcDialogComponent,
    RoleDialogComponent,
    CrfFileComponent,
    AddFieldComponent,
    FieldsSidebarComponent,
    CrfFieldConfigModalComponent,
    AddBaseFieldModalComponent,
    CrfComponent,
    PatientComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatSelectModule,
    MatInputModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatTooltipModule,
    SharedModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatAccordion,
    MatExpansionModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatTable,
    MatSlideToggle,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

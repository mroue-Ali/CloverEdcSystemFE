import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';
import {RolesComponent} from './roles/roles.component';
import {UsersComponent} from './users/users.component';
import {StudiesComponent} from './studies/studies.component';
import {ProtocolsComponent} from './protocols/protocols.component';
import {CrfTemplateComponent} from './crf-template/crf-template.component';
import {SitesComponent} from './sites/sites.component';
import {PisComponent} from './pis/pis.component';
import {CrcsComponent} from './crcs/crcs.component';
import {DmsComponent} from './dms/dms.component';
import {AddFieldComponent} from './add-field/add-field.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  {path:'roles',component:RolesComponent,canActivate:[AuthGuard]},
  {path:'users',component:UsersComponent,canActivate:[AuthGuard]},
  {path:'studies',component:StudiesComponent,canActivate:[AuthGuard]},
  {path:'protocols',component:ProtocolsComponent,canActivate:[AuthGuard]},
  {path:'crf_template',component:CrfTemplateComponent,canActivate:[AuthGuard]},
  {path:'sites',component:SitesComponent,canActivate:[AuthGuard]},
  {path:'pis',component:PisComponent,canActivate:[AuthGuard]},
  {path:'crcs',component:CrcsComponent,canActivate:[AuthGuard]},
  {path:'dms',component:DmsComponent,canActivate:[AuthGuard]},
  // { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] }, // Add this
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Default Route
  { path: 'crf-file/:fileId/add-field', component: AddFieldComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

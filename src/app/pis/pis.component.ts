import { Component } from '@angular/core';
import {SitesConfig} from '../sites/sites.config';
import {SiteModel} from '../../models/site.model';
import {ProtocolModel} from '../../models/Protocol.model';
import {MatDialog} from '@angular/material/dialog';
import {SitesService} from '../sites/sites.service';
import {UserDialogComponent} from '../users/user-dialog/user-dialog.component';
import {SiteDialogComponent} from '../sites/site-dialog/site-dialog.component';
import {PisConfig} from './pis.config';
import {PiModel} from '../../models/pi.model';
import {PisService} from './pis.service';
import {PiDialogComponent} from './pi-dialog/pi-dialog.component';
import {CrcDialogComponent} from '../crcs/crc-dialog/crc-dialog.component';

@Component({
  selector: 'app-pis',
  templateUrl: './pis.component.html',
  styleUrl: './pis.component.scss'
})
export class PisComponent {
  config = PisConfig;
  pis: PiModel[] = [];
  size = 10;
  sites: SiteModel[] = [];
  pageIndex = 0;
  user = JSON.parse(localStorage.getItem('user') || '{}');
  keyword = "";
  actions: any[] = [
    {
      icon: 'edit',
      name: 'Edit',
      class: 'col-blue',
      action: (row: any) => this.onEdit(row), // Placeholder action
      condition: (row: any) => true
    },
    {
      icon: 'delete',
      name: 'Delete',
      class: 'col-red',
      action: (row: any) => this.onDelete(row), // Placeholder action
      //condition: (row: any) => row.role.name !== 'Admin'
    }
  ];

  //constructor with roles service
  constructor(private dialog: MatDialog, private service: PisService,private sitesService: SitesService) {
  }

  ngOnInit() {
    this.LoadData();
    this.getSites();
    this.config.actions = this.actions;
    // if (this.user.role.name == "Admin"){
    //   //remove the  { name: 'study.name', header: 'Study', type: 'text' } column
    //   this.config?.columns?.pop();
    // }
  }
  getSites() {
    this.sitesService.getAllByStudyId(this.user.studyId,1000,0,"").subscribe((res: any) => {
      this.sites = res.data;
    });
  }
  LoadData() {
    this.service.getAllByStudyId(this.user.studyId,this.size, this.pageIndex, this.keyword).subscribe((res: any) => {
      this.pis = res.data;
      this.config.totalCount = res.count;
    });
  }

  onEdit(row: any) {
    const dialogRef = this.dialog.open(CrcDialogComponent, {
      width: '400px',
      data: {
        item: row,
        action: 'editPi',
        sites: this.sites
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.service.edit(result, row.id).subscribe(() => {
          this.LoadData();
        });
      }
    });
  }

  onAdd() {

    const dialogRef = this.dialog.open(CrcDialogComponent, {
      width: '400px',
      data: {
        action: 'add',
        sites: this.sites
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        result.studyId = this.user.studyId;
        this.service.add(result,this.user.studyId).subscribe(() => {
          this.LoadData();
        });

        // this.studies.push(result); // Add new user to the list
      }
    });
  }

  onSearch(event: string) {
    this.keyword = event;
    this.LoadData();
  }

  onRefresh(event: { pageIndex: number; pageSize: number }) {
    console.log("event : ", event);
    if (event) {
      this.pageIndex = event.pageIndex;
      this.size = event.pageSize;
    }
    this.LoadData();
  }

  onDelete(row: any){
    this.service.delete(row.id).subscribe(() => {})
  }

}

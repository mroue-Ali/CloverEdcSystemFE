import {Component} from '@angular/core';
import {PisConfig} from '../pis/pis.config';
import {PiModel} from '../../models/pi.model';
import {MatDialog} from '@angular/material/dialog';
import {PisService} from '../pis/pis.service';
import {PiDialogComponent} from '../pis/pi-dialog/pi-dialog.component';
import {CrcsConfig} from './crcs.config';
import {CrcModel} from '../../models/crc.model';
import {CrcDialogComponent} from './crc-dialog/crc-dialog.component';
import {SiteModel} from '../../models/site.model';
import {CrcsService} from './crcs.service';

@Component({
  selector: 'app-crcs',
  templateUrl: './crcs.component.html',
  styleUrl: './crcs.component.css'
})
export class CrcsComponent {
  config = CrcsConfig;
  crcs: CrcModel[] = [];
  sites: SiteModel[] = [];
  size = 10;
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
      action: (row: any) => console.log('Delete item:', row), // Placeholder action
      condition: (row: any) => row.role.name !== 'Admin'
    }
  ];

  //constructor with roles service
  constructor(private dialog: MatDialog, private service: CrcsService) {
  }

  ngOnInit() {
    this.LoadData();
    this.getSites();
    this.config.actions = this.actions;
  }

  getSites() {
    this.service.getAllSites(this.user.studyId).subscribe((res: any) => {
      this.sites = res.data;
    });
  }

  LoadData() {
    this.service.getAllByStudyId(this.user.studyId, this.size, this.pageIndex, this.keyword).subscribe((res: any) => {
      this.crcs = res.data;
      this.config.totalCount = res.count;
    });
  }

  onEdit(row: any) {
    const dialogRef = this.dialog.open(CrcDialogComponent, {
      width: '400px',
      data: {
        item: row,
        action: 'edit',
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
        result.studyId = this.user.studyId
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

}

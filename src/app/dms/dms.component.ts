import { Component } from '@angular/core';
import {PisConfig} from '../pis/pis.config';
import {PiModel} from '../../models/pi.model';
import {MatDialog} from '@angular/material/dialog';
import {PisService} from '../pis/pis.service';
import {PiDialogComponent} from '../pis/pi-dialog/pi-dialog.component';
import {DmsConfig} from './dms.config';
import {DmModel} from '../../models/dm.model';
import {DmsService} from './dms.service';
import {UserDialogComponent} from '../users/user-dialog/user-dialog.component';

@Component({
  selector: 'app-dms',
  templateUrl: './dms.component.html',
  styleUrl: './dms.component.scss'
})
export class DmsComponent {
  config = DmsConfig;
  dms: DmModel[] = [];
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
      action: (row: any) => this.onDelete(row), // Placeholder action
      //condition: (row: any) => row.role.name !== 'Admin'
    }
  ];

  //constructor with roles service
  constructor(private dialog: MatDialog, private service: DmsService) {
  }

  ngOnInit() {
    this.LoadData();
    this.config.actions = this.actions;
    // if (this.user.role.name == "Admin"){
    //   //remove the  { name: 'study.name', header: 'Study', type: 'text' } column
    //   this.config?.columns?.pop();
    // }
  }

  LoadData() {
    this.service.getAllByStudyId(this.user.studyId,this.size, this.pageIndex, this.keyword).subscribe((res: any) => {
      this.dms = res.data;
      this.config.totalCount = res.count;
    });
  }

  onEdit(row: any) {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '400px',
      data: {
        item: row,
        action: 'editDM',
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
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '400px',
      data: {
        action: 'addAdminDM'
      }, // Pass data if needed
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.service.add(result,this.user.studyId).subscribe(() => {
          this.LoadData();
        });
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

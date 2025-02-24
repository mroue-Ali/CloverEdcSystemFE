import {Component} from '@angular/core';
import {RolesConfig} from '../roles/roles.config';
import {RoleModel} from '../../models/role.model';
import {MatDialog} from '@angular/material/dialog';
import {RoleService} from '../roles/roles.service';
import {RoleDialogComponent} from '../roles/role-dialog/role-dialog.component';
import {CrfService} from './crf.service';
import {CrfConfig} from './crf.config';

@Component({
  selector: 'app-crf',
  templateUrl: './crf.component.html',
  styleUrl: './crf.component.css'
})
export class CrfComponent {
  config = CrfConfig;
  keyword = "";
  roles: RoleModel[] = [];
  size = 10;
  currentUser: any;
  pageIndex = 0;
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
    },
    {
      icon: 'visibility',
      name: 'manage crf',
      class: 'col-green',
      action: (row: any) => this.GoToCrfDetails(row), // Placeholder action
      condition: (row: any) => true
    }
  ];

  constructor(private dialog: MatDialog, private service: CrfService) {
  }

  ngOnInit() {
    this.LoadData();
    this.config.actions = this.actions;
  }

  GoToCrfDetails(row: any) {
    console.log('View item:', row);
  }

  LoadData() {
    this.service.getAll(this.size, this.pageIndex, this.keyword).subscribe((res: any) => {
      this.roles = res.data;
      this.config.totalCount = res.count;

    });
    // if (this.currentUser.role == 'Admin') {
    //   this.service.getAllByStudy(this.currentUser.studyId, this.size, this.pageIndex, this.keyword).subscribe((res: any) => {
    //     this.roles = res.data;
    //     this.config.totalCount = res.count;
    //
    //   });
    // } else if (this.currentUser.role == 'CRC') {
    //   this.service.getAllByCrc(this.currentUser.id, this.size, this.pageIndex, this.keyword).subscribe((res: any) => {
    //     this.roles = res.data;
    //     this.config.totalCount = res.count;
    //   });
    // }

  }

  onAdd() {

    const dialogRef = this.dialog.open(RoleDialogComponent, {
      width: '400px',
      data: {
        action: 'add',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.service.add(result).subscribe(() => {
          this.LoadData();
        });

        // this.studies.push(result); // Add new user to the list
      }
    });
  }

  onEdit(row: any) {

    const dialogRef = this.dialog.open(RoleDialogComponent, {
      width: '400px',
      data: {
        item: row,
        action: 'edit',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.service.edit(result, row.id).subscribe(() => {
          this.LoadData();
        });

        // this.studies.push(result); // Add new user to the list
      }
    });
  }

  onRefresh(event: { pageIndex: number; pageSize: number }) {
    console.log("event : ", event);
    if (event) {
      this.pageIndex = event.pageIndex;
      this.size = event.pageSize;
    }
    this.LoadData();
  }

  onExport() {
    console.log('Export Data');
  }

  onSearch(event: string) {
    this.keyword = event;
    this.LoadData();
  }

  //delete role
  onDelete(row: any) {
    console.log('Delete Data');

  }
}

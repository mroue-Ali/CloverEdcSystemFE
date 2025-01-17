import {Component, OnInit} from '@angular/core';
import {RoleService} from './roles.service';
import {RoleModel} from '../../models/role.model';
import {UsersConfig} from '../users/users.config';
import {RolesConfig} from './roles.config';
import {CrcDialogComponent} from '../crcs/crc-dialog/crc-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {RoleDialogComponent} from './role-dialog/role-dialog.component';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.scss'
})
export class RolesComponent {
  config = RolesConfig;
  keyword = "";
  roles: RoleModel[] = [];
  size = 10;
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
    }
  ];

  //constructor with roles service
  constructor(private dialog: MatDialog, private service: RoleService) {
  }

  ngOnInit() {
    this.LoadData();
    this.config.actions = this.actions;
  }

  LoadData() {
    this.service.getAll(this.size, this.pageIndex, this.keyword).subscribe((res: any) => {
      this.roles = res.data;
      this.config.totalCount = res.count;

    });

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

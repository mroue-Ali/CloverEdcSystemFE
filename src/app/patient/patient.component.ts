import { Component } from '@angular/core';
import {RolesConfig} from '../roles/roles.config';
import {RoleModel} from '../../models/role.model';
import {MatDialog} from '@angular/material/dialog';
import {RoleService} from '../roles/roles.service';
import {RoleDialogComponent} from '../roles/role-dialog/role-dialog.component';
import {PatientService} from './patient.service';
import {PatientConfig} from './patient.config';

@Component({
  selector: 'app-crf',
  templateUrl: './patient.component.html',
  styleUrl: './patient.component.css'
})
export class PatientComponent {
  config = PatientConfig;
  keyword = "";
  roles: RoleModel[] = [];
  size = 10;
  pageIndex = 0;
  actions: any[] =  [
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
  constructor(private dialog: MatDialog, private service: PatientService) {
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

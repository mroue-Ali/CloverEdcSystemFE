import { Component } from '@angular/core';
import {UsersConfig} from '../users/users.config';
import {UserModel} from '../../models/user.model';
import {MatDialog} from '@angular/material/dialog';
import {UsersService} from '../users/users.service';
import {UserDialogComponent} from '../users/user-dialog/user-dialog.component';
import {StudiesService} from './studies.service';
import {StudiesConfig} from './studies.config';
import {ProtocolModel} from '../../models/Protocol.model';
import {StudyModel} from '../../models/study.model';
import {StudyDialogComponent} from './studie-dialog/study-dialog.component';
import {ProtocolsService} from '../protocols/protocols.service';

@Component({
  selector: 'app-studies',
  templateUrl: './studies.component.html',
  styleUrl: './studies.component.scss'
})
export class StudiesComponent {
  config = StudiesConfig;
  studies: StudyModel[] = [];
  protocols: ProtocolModel[] = [];
  size = 10;
  pageIndex = 0;
  keyword = "";
  actions: any[] = [
    {
      icon: 'edit',
      name: 'Edit',
      class: 'col-blue',
      action: (row : any) => this.onEdit(row), // Placeholder action
      condition: (row : any) => true
    },
    {
      icon: 'add',
      name: 'Add Admin',
      class: 'col-green',
      action: (row : any) => this.onAddNewAdmin(row), // Placeholder action
      condition: (row : any) => row.hasAdmin===false
    },
    {
      icon: 'delete',
      name: 'Delete',
      class: 'col-red',
      action: (row : any) => console.log('Delete item:', row), // Placeholder action
      condition: (row : any) => row.role.name !== 'Admin'
    }
  ];
  //constructor with roles service
  constructor(private dialog: MatDialog,private studiesService: StudiesService,private protocolService: ProtocolsService) {
  }

  ngOnInit() {
    this.LoadData();
    this.getProtocols();
    this.config.actions = this.actions ;

  }
  getProtocols(){
    this.protocolService.getAll(1000,0,"").subscribe((res: any) => {
      this.protocols = res.data;
    });
  }

  LoadData() {
    this.studiesService.getAll(this.size, this.pageIndex, this.keyword).subscribe((res: any) => {
      this.studies = res.data;
      this.config.totalCount = res.count;
    });
  }
  onAddNewAdmin(row: any) {
    console.log('Add Admin:', row);
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '400px',
      data: {
        item: row,
        action: 'addAdmin'
      }, // Pass data if needed
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Add Admin:', result);
        this.studiesService.addAdmin(result,row.id).subscribe(() => {
          this.LoadData();
        });
      }
    });
  }
  onEdit (row: any) {
    console.log('Edit Item:', row);
    const dialogRef = this.dialog.open(StudyDialogComponent, {
      width: '400px',
      data: {
        item: row,
        action: 'edit',
        protocols : this.protocols

      }, // Pass data if needed
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Edit Study:', result);
        this.studiesService.edit(result,row.id).subscribe(() => {
          this.LoadData();
        });
      }
    });
  }
  onAdd() {
    console.log("protocols : ",this.protocols)
    const dialogRef = this.dialog.open(StudyDialogComponent, {
      width: '400px',
      data: {
        protocols : this.protocols
      }, // Pass data if needed
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('New Study:', result);

        this.studiesService.add(result).subscribe(() => {
          this.LoadData();
        });
        // this.studies.push(result); // Add new user to the list
      }
    });
  }

  onSearch(event: string) {
    // this.pageIndex=0;
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

  onExport() {
    console.log('Export Data');
  }

}

import { Component } from '@angular/core';
import {UsersConfig} from '../users/users.config';
import {UserModel} from '../../models/user.model';
import {MatDialog} from '@angular/material/dialog';
import {UsersService} from '../users/users.service';
import {UserDialogComponent} from '../users/user-dialog/user-dialog.component';
import {ProtocolsService} from './protocols.service';
import {ProtocolsConfig} from './protocols.config';
import {ProtocolModel} from '../../models/Protocol.model';
import {StudyModel} from '../../models/study.model';
import {ProtocolDialogComponent} from './protocol-dialog/protocol-dialog.component';

@Component({
  selector: 'app-studies',
  templateUrl: './protocols.component.html',
  styleUrl: './protocols.component.scss'
})
export class ProtocolsComponent {
  config = ProtocolsConfig;
  titttt="TEST";
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
      icon: 'delete',
      name: 'Delete',
      class: 'col-red',
      action: (row : any) => console.log('Delete item:', row), // Placeholder action
      condition: (row : any) => row.role.name !== 'Admin'
    }
  ];
  //constructor with roles service
  constructor(private dialog: MatDialog,private protocolsService: ProtocolsService) {
  }

  ngOnInit() {
    this.LoadData();
    this.config.actions = this.actions ;
  }

  LoadData() {
    this.protocolsService.getAll(this.size, this.pageIndex, this.keyword).subscribe((res: any) => {
      this.protocols = res.data;
      this.config.totalCount = res.count;
    });
  }
  onEdit(row: any) {
    console.log('Edit Item:', row);
    const dialogRef = this.dialog.open(ProtocolDialogComponent, {
      width: '400px',
      data: {
        item: row,
        action: 'edit',
      }, // Pass data if needed

    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Updated Protocol:', result);

        this.protocolsService.edit(result,row.id).subscribe(() => {
          this.LoadData();
        });
        // this.studies = this.studies.map((item: any) => item.id === result.id? result : item); // Update user in the list
      }
    })
  }
  onAdd() {
    const dialogRef = this.dialog.open(ProtocolDialogComponent, {
      width: '400px',
      data: {
      }, // Pass data if needed
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('New Protocol:', result);

        this.protocolsService.add(result).subscribe(() => {
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

  onExport() {
    console.log('Export Data');
  }

}

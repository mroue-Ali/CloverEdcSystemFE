import {Component} from '@angular/core';
import {RoleModel} from '../../models/role.model';
import {RoleService} from '../roles/roles.service';
import {UsersService} from './users.service';
import {UserModel} from '../../models/user.model';
import {UsersConfig} from './users.config';
import {UserDialogComponent} from './user-dialog/user-dialog.component';
import {MatDialog } from  '@angular/material/dialog'
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  config = UsersConfig;
  users: UserModel[] = [];
  size = 10;
  pageIndex = 0;
  keyword = "";
  roles : RoleModel[] = [];
  actions: any[] = [
    // {
    //   icon: 'edit',
    //   name: 'Edit',
    //   class: 'col-blue',
    //   action: (row: any) => t  his.onEdit(row), // Placeholder action
    //   condition: (row: any) => true
    // },
    // {
    //   icon: 'delete',
    //   name: 'Delete',
    //   class: 'col-red',
    //   action: (row: any) => console.log('Delete item:', row), // Placeholder action
    //   condition: (row: any) => row.role.name !== 'Admin'
    // }
  ];
  //constructor with roles service
  constructor(private dialog: MatDialog,private usersService: UsersService, private rolesService: RoleService) {
  }

  ngOnInit() {
    this.LoadData();
    this.getRoles();
    this.config.actions = this.actions;

  }
  getRoles(){
    this.rolesService.getAll(10000,0).subscribe((res: any) => {
      this.roles = res.data;
    });
  }

  LoadData() {
    this.usersService.getAll(this.size, this.pageIndex, this.keyword).subscribe((res: any) => {
      this.users = res.data;
      this.config.totalCount = res.count;
    });
  }

  onAdd() {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '400px',
      data: {
        action: 'add',
        roles : this.roles // Get all roles for dropdown in the dialog component
      }, // Pass data if needed
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.usersService.add(result.data).subscribe(
          () => {
            this.LoadData();
          },
          error => console.error('Error adding user:', error)
        )
      }
    });
  }
  onEdit(row: any) {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '400px',
      data: {
        item: row,
        action: 'edit',
        roles : this.roles // Get all roles for dropdown in the dialog component
      }, // Pass data if needed
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log("result : ", result);
        this.usersService.edit(result.data,row.id).subscribe(
          () => {
            this.LoadData();
          },
          error => console.error('Error adding user:', error)
        )
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

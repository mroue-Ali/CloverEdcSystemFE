import {Component} from '@angular/core';
import {StudiesConfig} from '../studies/studies.config';
import {StudyModel} from '../../models/study.model';
import {ProtocolModel} from '../../models/Protocol.model';
import {MatDialog} from '@angular/material/dialog';
import {StudiesService} from '../studies/studies.service';
import {UserDialogComponent} from '../users/user-dialog/user-dialog.component';
import {StudyDialogComponent} from '../studies/studie-dialog/study-dialog.component';
import {SitesService} from './sites.service';
import {SitesConfig} from './sites.config';
import {SiteModel} from '../../models/site.model';
import {SiteDialogComponent} from './site-dialog/site-dialog.component';

@Component({
  selector: 'app-sites',
  templateUrl: './sites.component.html',
  styleUrl: './sites.component.scss'
})
export class SitesComponent {
  config = SitesConfig;
  sites: SiteModel[] = [];
  protocols: ProtocolModel[] = [];
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
      icon: 'add',
      name: 'Add Pi',
      class: 'col-green',
      action: (row : any) => this.onAddNewPi(row), // Placeholder action
      condition: (row : any) => row.hasPi === false
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
  constructor(private dialog: MatDialog, private sitesService: SitesService) {
  }

  ngOnInit() {
    this.LoadData();
    this.getProtocols();
    this.config.actions = this.actions;
    if (this.user.role.name == "Admin"){
      //remove the  { name: 'study.name', header: 'Study', type: 'text' } column
      // i dont want pop , I want to remove the column with name 'study.name' cause maybe the last column is not 'study.name'
      this.config.columns = this.config?.columns?.filter(column => column.name !== 'study.name');

    }
  }

  getProtocols() {
    this.sitesService.getProtocols().subscribe((res: any) => {
      this.protocols = res.data;
    });
  }

  LoadData() {
    this.sitesService.getAllByStudyId(this.user.studyId,this.size, this.pageIndex, this.keyword).subscribe((res: any) => {
      this.sites = res.data;
      this.config.totalCount = res.count;
    });
  }

  onAddNewPi(row: any) {
    console.log('Add Admin:', row);
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '400px',
      data: {
        item: row,
        action: 'addPi'
      }, // Pass data if needed
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Add PI:', result);
        this.sitesService.addPi(result, row.id).subscribe(() => {
          this.LoadData();
        });
      }
    });
  }

  onEdit(row: any) {
    const dialogRef = this.dialog.open(SiteDialogComponent, {
      width: '400px',
      data: {
        item: row,
        action: 'edit',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.sitesService.edit(result, row.id).subscribe(() => {
          this.LoadData();
        });
      }
    });
  }

  onAdd() {
    const dialogRef = this.dialog.open(SiteDialogComponent, {
      width: '400px',
      data: {
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        result.studyId = this.user.studyId
        this.sitesService.add(result).subscribe(() => {
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

  onDelete(row : any){
    this.sitesService.delete(row.id).subscribe(() => {})
  }

}

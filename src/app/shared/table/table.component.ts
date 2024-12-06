import {Component, Input, Output, OnInit, EventEmitter} from '@angular/core';
import {TableColumn, TableConfig} from '../../../models/tableConfig.model';
import {Action} from '../../../models/action.model';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-custom-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent<T> {
  @Input() config: TableConfig = { columns: [], actions: [], pagination: true };
  @Input() items: any[] = [];

  @Output() addItem = new EventEmitter<any>();
  @Output() refresh = new EventEmitter<any>();
  @Output() exportData = new EventEmitter<any>();
  @Output() search = new EventEmitter<any>();

  private openMenus = new Set<any>();
  pageIndex = 0;
  pageSize = 10;
  ngOnInit() {

  }

  paginatorPageChanged(event: { pageIndex: number; pageSize: number }): void {
    console.log("test changed paginator : ",event);
    // this.pageIndex = event.pageIndex * event.pageSize;
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.refreshPage(this.pageIndex, this.pageSize);
  }

  refreshPage(pageIndex: number, pageSize: number): void {
    if (this.refresh) {
      this.refresh.emit({
        pageIndex: pageIndex,
        pageSize: pageSize,
      });
    }
  }
  onSearch(event: any): void {
    const value = event.target.value;
    this.search.emit(value);

  }
  getValue(row: any, key: string): any {
    return key.split('.').reduce((acc, part) => acc && acc[part], row);
  }

  toggleMenu(item: any) {
    if (this.openMenus.has(item)) {
      this.openMenus.delete(item);
    } else {
      this.openMenus.clear(); // Close other menus
      this.openMenus.add(item);
    }
  }

  closeMenu(item: any) {
    this.openMenus.delete(item);
  }

  isMenuOpen(item: any): boolean {
    return this.openMenus.has(item);
  }

  handleAction(action: Action, row: any) {
    if (action.condition && !action.condition(row)) {
      return; // Skip action if condition is not met
    }
    action.action(row);
  }

  getConditionalClass(row: any, column: TableColumn): string {
    return column.conditionalClass ? column.conditionalClass(row) : '';
  }

  isActionVisible(action: Action, row: any): boolean {
    return action.condition ? action.condition(row) : true;
  }

}

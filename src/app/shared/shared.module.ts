import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import {MatPaginator} from "@angular/material/paginator";

@NgModule({
  declarations: [TableComponent],
    imports: [CommonModule, MatPaginator],
  exports: [TableComponent]
})
export class SharedModule {}

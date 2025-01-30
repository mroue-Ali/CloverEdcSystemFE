import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {BaseField} from '../../models/BaseField.model';
import {CrfFieldConfigModalComponent} from '../crf-template/crf-field-config-modal/crf-field-config-modal.component';
import {AddBaseFieldModalComponent} from '../crf-template/add-base-field-modal/add-base-field-modal.component';

@Component({
  selector: 'app-fields-sidebar',
  templateUrl: './fields-sidebar.component.html',
  styleUrl: './fields-sidebar.component.css'
})
export class FieldsSidebarComponent {
  @Input() baseFields: BaseField[] = [];
  @Input() fileId!: string; // Accept the fileId as input
  @Input() crfFields: any[] = [];
  @Output() linkBaseField = new EventEmitter<BaseField>();
  @Output() configureCrfField = new EventEmitter<any>();
  @Output() baseFieldAdded = new EventEmitter<any>();
  @Input() templateId!: string; // Accept templateId as input
  @Input() isNextQuestionMode = false; // Track "Next Question Mode"
  @Output() baseFieldClicked = new EventEmitter<BaseField>(); // Emit BaseField click event

  constructor(private dialog: MatDialog) {}

  selectField(field: BaseField): void {
    const dialogRef = this.dialog.open(CrfFieldConfigModalComponent, {
      width: '400px',
      data: {
        baseFieldId: field.id,
        isRequired: false,
        relatedField: '',
        relatedValue: '',
        availableFields: this.crfFields,
        fieldTypes: [
          {id: '39799CAC-1B8D-4B6A-912F-53B5F9063B86', name: 'Text'},
          {id: '1233', name: 'Number'},
          {id: '12345', name: 'Date'},
          {id: '123456', name: 'Boolean'},
          {id: '061B60B2-5215-42EC-9EB7-90CC1614E25E', name: 'DropDown'}
        ]
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.configureCrfField.emit(result); // Emit the configured CrfField options
      }
    });
  }
  onBaseFieldClick(baseField: BaseField): void {
    this.baseFieldClicked.emit(baseField); // Emit the clicked BaseField
  }
  addBaseField(): void {
    const dialogRef = this.dialog.open(AddBaseFieldModalComponent, {
      width: '400px',
      data: { name: '', type: '', choices: [], templateId: this.templateId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.baseFieldAdded.emit(result); // Emit the new base field data to the parent component
      }
    });  }
}

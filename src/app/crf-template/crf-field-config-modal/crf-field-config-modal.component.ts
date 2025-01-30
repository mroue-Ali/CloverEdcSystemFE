import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CrfField} from '../../../models/crfField.model';

@Component({
  selector: 'app-crf-field-config-modal',
  templateUrl: './crf-field-config-modal.component.html',
  styleUrls: ['./crf-field-config-modal.component.css']
})
export class CrfFieldConfigModalComponent {
  availableFields: CrfField[] = [];
  selectedRelatedField: CrfField | null = null; // Holds the selected related field object

  isDropdown = false;
  relatedFieldOptions: any[] = []; // Options for the selected related field if it's a dropdown
  relatedFieldType = 'text'; // Default type for relatedValue input

  constructor(
    public dialogRef: MatDialogRef<CrfFieldConfigModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.availableFields = data.availableFields;
    if (data.relatedField) {
      this.selectedRelatedField = this.availableFields.find(field => field.id === data.relatedField) || null;
      if (this.selectedRelatedField) {
        this.onRelatedFieldChange(this.selectedRelatedField); // Initialize related field logic
      }
    }
  }

  // Called when the related field is selected
  onRelatedFieldChange(field: CrfField): void {
    this.data.relatedField = field.id; // Set the related field ID in the data
    // Handle dropdown type
    if (field.baseField.type.name === 'DropDown') {
      this.isDropdown = true;
      console.log(field.baseField.dropDownOptions);
      this.relatedFieldOptions = field.baseField.dropDownOptions || []; // Assuming options are provided in the field object
    } else {
      // Handle other types
      this.isDropdown = false;
      this.relatedFieldType = this.mapFieldTypeToInputType(field.baseField.type.name);
    }
  }
  getRelatedFieldInputType(typeName: string | undefined): string {
    switch (typeName) {
      case 'number':
        return 'number';
      case 'date':
        return 'date';
      default:
        return 'text'; // Default to text for unsupported types
    }
  }
  // Map field type to input type
  private mapFieldTypeToInputType(typeName: string): string {
    switch (typeName) {
      case 'Number':
        return 'number';
      case 'Date':
        return 'date';
      case 'Text':
      default:
        return 'text';
    }
  }

  save(): void {
    this.dialogRef.close(this.data); // Pass the updated data back to the parent component
  }
}

// import { Component, Inject } from '@angular/core';
// import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
// import {CrfField} from '../../../models/crfField.model';
//
// @Component({
//   selector: 'app-crf-field-config-modal',
//   templateUrl: './crf-field-config-modal.component.html',
//   styleUrls: ['./crf-field-config-modal.component.css']
// })
// export class CrfFieldConfigModalComponent {
//   availableFields: CrfField[] = [];
//
//   constructor(
//     public dialogRef: MatDialogRef<CrfFieldConfigModalComponent>,
//     @Inject(MAT_DIALOG_DATA) public data:any,
//   ) {
//     this.availableFields = data.availableFields;
//   }
//
//   save(): void {
//     this.dialogRef.close(this.data); // Pass the updated data back to the parent component
//   }
// }

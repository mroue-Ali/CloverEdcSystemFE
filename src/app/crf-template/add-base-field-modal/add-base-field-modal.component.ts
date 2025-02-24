import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-add-base-field-modal',
  templateUrl: './add-base-field-modal.component.html',
  styleUrls: ['./add-base-field-modal.component.css']
})
export class AddBaseFieldModalComponent {

  constructor(
    public dialogRef: MatDialogRef<AddBaseFieldModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  onTypeChange(): void {
console.log("data.type : ",this.data.type)
    if (this.data.type.name === 'DropDown') {
console.log("data.type : ",this.data.type)

      // if (this.data.type !== this.dropdownTypeId) {
      this.data.choices = []; // Clear choices if type is not dropdown
    }
  }

  addChoice(): void {
    this.data.choices.push('');
  }

  removeChoice(index: number): void {
    this.data.choices.splice(index, 1);
  }

  save(): void {
    this.dialogRef.close(this.data); // Pass the entered data back to the parent component
  }
}

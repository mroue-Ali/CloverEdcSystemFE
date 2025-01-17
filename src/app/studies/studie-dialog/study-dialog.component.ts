import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './study-dialog.component.html',
  styleUrls: ['./study-dialog.component.scss']
})
export class StudyDialogComponent {
  userForm: FormGroup;
  data: any;
  statuses = ['Pending', 'Opened', 'Closed','Lunched'];
  label = 'Add';
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<StudyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public Idata: any
  ) {
    this.userForm = this.fb.group({
      name: [Idata.item?.name, [Validators.required]],
      status: [Idata.item?.status],
//I want the status to be exist only if action = edit and not required
      protocolId: [Idata.item?.protocolId, [Validators.required]],
    });
    if (Idata.action === 'edit') {
      this.userForm.addControl('status', this.fb.control(Idata.item?.status));
    }
    this.data = Idata;
    this.label = Idata.action === 'edit' ? 'Edit' : 'Add';
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.dialogRef.close(this.userForm.value);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}

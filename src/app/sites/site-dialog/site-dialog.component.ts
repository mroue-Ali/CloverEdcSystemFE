import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './site-dialog.component.html',
  styleUrls: ['./site-dialog.component.scss']
})
export class SiteDialogComponent {
  form: FormGroup;
  statuses = ['Pending', 'Opened', 'Closed'];
  label = 'Add Site';
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<SiteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    this.form = this.fb.group({
      name: [data.item?.name, [Validators.required]],
      location: [data.item?.location, [Validators.required]],
    });

    if (data.action === 'edit') {
      this.label = 'Edit Site';
      this.form.addControl('status', this.fb.control(data.item?.status));
    }
    // if (data.action === 'edit') {
    //   this.userForm.addControl('status', this.fb.control(data.item?.status));
    // }

  }

  onSubmit() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}

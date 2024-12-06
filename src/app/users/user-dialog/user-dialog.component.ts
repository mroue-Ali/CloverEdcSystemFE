import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss']
})
export class UserDialogComponent {
  userForm: FormGroup;
  hideRole: boolean;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    this.hideRole = data.action === 'addAdmin' || data.action === 'addPi';

    this.userForm = this.fb.group({
      //fill the data with data.item?
      userName: [data.item?.userName, Validators.required],
      firstName: [data.item?.firstName, Validators.required],
      lastName: [data.item?.lastName, Validators.required],
      email: [data.item?.email, [Validators.required, Validators.email]],
      roleId: [data.item?.roleId, this.hideRole?[]: Validators.required],
      password: ['', data.action != "edit" ? Validators.required: []],

    });
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

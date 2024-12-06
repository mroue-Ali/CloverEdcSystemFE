import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './pi-dialog.component.html',
  styleUrls: ['./pi-dialog.component.scss']
})
export class PiDialogComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<PiDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    this.form = this.fb.group({
      firstName: [data.item?.user.firstName, [Validators.required]],
      lastName: [data.item?.user.lastName, [Validators.required]],
      userName: [data.item?.user.userName, [Validators.required]],
      email: [data.item?.user.email, [Validators.required]],
    });

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

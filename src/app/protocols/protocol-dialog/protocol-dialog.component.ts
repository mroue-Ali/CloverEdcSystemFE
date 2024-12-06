import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './protocol-dialog.component.html',
  styleUrls: ['./protocol-dialog.component.scss']
})
export class ProtocolDialogComponent {
  protocolForm: FormGroup;
  data: any;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ProtocolDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public Idata: any
  ) {
    this.protocolForm = this.fb.group({
      name: [Idata.item?.name || '', [Validators.required]],
      numOfVisits: [Idata.item?.numOfVisits || '', [Validators.required]],
      randomization: [Idata.item?.randomization?.toString() || 'false', [Validators.required]],
    });
    this.data = Idata;
  }

  onSubmit() {
    if (this.protocolForm.valid) {
      this.dialogRef.close(this.protocolForm.value);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}

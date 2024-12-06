import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './crc-dialog.component.html',
  styleUrls: ['./crc-dialog.component.scss']
})
export class CrcDialogComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CrcDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    var siteIds = data.action=="editPi"?  data.item?.piSites?.map((site: any) => site.siteId): data.item?.crcSites?.map((site: any) => site.siteId);
    console.log("asdasdasdasd", siteIds);
    this.form = this.fb.group({
      firstName: [data.item?.user.firstName, [Validators.required]],
      lastName: [data.item?.user.lastName, [Validators.required]],
      userName: [data.item?.user.userName, [Validators.required]],
      email: [data.item?.user.email, [Validators.required]],
      siteIds: [siteIds?.length > 0 ? siteIds : [], [Validators.required]],
      password: ['', data.action == "edit" || data.action =="editPi" ? [] : [Validators.required]],
    });

    // if (data.action === 'edit') {
    //   this.userForm.addControl('status', this.fb.control(data.item?.status));
    // }

  }

  ngOnInit() {
    // const selectedSiteIds = (this.data.item?.siteIds || []).map((site: any) => site.id);
    // console.log(selectedSiteIds);
    // console.log(this.data.item?.siteIds);
    // this.form = this.fb.group({
    //   siteIds: [selectedSiteIds], // Prepopulate with selected IDs
    // });
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

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {CrfTemplateService} from '../crf-template/crf-template.service';
import {CrfField} from '../../models/crfField.model';
import {BaseField} from '../../models/BaseField.model';
import {CrfFieldConfigModalComponent} from '../crf-template/crf-field-config-modal/crf-field-config-modal.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-add-field',
  templateUrl: './add-field.component.html',
  styleUrls: ['./add-field.component.css']
})
export class AddFieldComponent implements OnInit {
  fileId!: string;
  templateId!: string;

  crfFields: CrfField[] = [];
  baseFields: BaseField[] = [];
  displayedColumns = ['fieldName', 'type'];
  user = JSON.parse(localStorage.getItem('user') || '{}');
  isNextQuestionMode = false;
  relatedFieldId: string | null = null; // ID of the CrfField triggering "Next Question"

  constructor(
    private route: ActivatedRoute,
    private service: CrfTemplateService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.fileId = this.route.snapshot.paramMap.get('fileId')!;
    this.service.getTemplateByStudyId(this.user.studyId).subscribe((template: any) => {
      this.templateId = template.id;
      this.loadBaseFields();

    });
    this.loadFields();
  }

  loadFields(): void {
    this.service.getFieldsByFileId(this.fileId).subscribe(fields => {
      this.crfFields = fields;
    });
  }

  loadBaseFields(): void {
    this.service.getBaseFieldsByCrfTemplateId(this.templateId).subscribe(baseFields => {
      this.baseFields = baseFields;
    });

  }

  addNewField(): void {
    alert('Navigate to Add New BaseField page/modal.');
  }
  // Activate "Next Question Mode"
  nextField(field: CrfField): void {
    this.isNextQuestionMode = true; // Activate the mode
    this.relatedFieldId = field.id; // Set the relatedFieldId
  }
  onBaseFieldClick(baseField: BaseField): void {
    if (this.isNextQuestionMode) {
      // Open the modal with the relatedField preselected
      const dialogRef = this.dialog.open(CrfFieldConfigModalComponent, {
        width: '400px',
        data: {
          availableFields: this.crfFields, // Pass available CrfFields
          relatedField: this.relatedFieldId, // Preselect the relatedField
          baseFieldId: baseField.id, // Pass the selected BaseField
          fieldName: '', // Allow the user to set the new field's name
          isRequired: false,
          relatedValue: '' // Allow the user to set the related value
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.configureCrfField(result); // Save the configured field
        }

        // Exit "Next Question Mode" after handling the modal
        this.isNextQuestionMode = false;
        this.relatedFieldId = null;
      });
    }
  }

  configureCrfField(config: any): void {
    const payload = {
      baseFieldId: config.baseFieldId,
      crfFileId: this.fileId,
      fieldName: config.fieldName,
      isRequired: config.isRequired,
      requiredFieldId: config.relatedField || null,
      requiredFieldValue: config.relatedValue || null
    };

    this.service.linkBaseFieldToFile(payload).subscribe(() => {
      this.loadFields(); // Refresh fields after linking
    });
  }
  addBaseField(newField: any): void {
    const payload = {
      name: newField.name,
      type: newField.type,
      typeId: newField.type,
      options: newField.choices,
      crfTemplateId: this.templateId
    };

    this.service.createBaseField(payload).subscribe(() => {
      this.loadBaseFields(); // Refresh the base fields list
    });
  }
}

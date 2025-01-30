import { Component, Input, Output, EventEmitter } from '@angular/core';
import {CrfTemplateService} from '../crf-template/crf-template.service';
import {CrfFileService} from './crf-file.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-crf-file',
  templateUrl: './crf-file.component.html',
  styleUrl: './crf-file.component.css'
})
export class CrfFileComponent {
  @Input() file: any;
  @Input() addSubFile!: (parentId: string) => void;
  @Output() fileDeleted: EventEmitter<void> = new EventEmitter<void>();

  constructor(private service: CrfFileService,private router: Router) {
    // service.getTemplateByStudyId(this.user.studyId).subscribe((template: any) => {
    //   this.template = template;
    // });

  }
  deleteFile(fileId: string): void {
    const confirmation = confirm('Are you sure you want to delete this file? This action cannot be undone.');
    if (confirmation) {
      const deleteType: 'soft' | 'actual' = 'actual'; // Change to 'actual' if needed
      this.service.deleteFile(fileId, deleteType).subscribe(() => {
        this.fileDeleted.emit(); // Notify parent component to reload files
      });
    }
  }
  addField(fileId: string): void {
    this.router.navigate([`/crf-file/${fileId}/add-field`]);
  }
}


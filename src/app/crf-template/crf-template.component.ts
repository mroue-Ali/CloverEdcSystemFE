import {Component, OnInit} from '@angular/core';
import {CrfTemplateService} from './crf-template.service';

  interface File {
  id: string;
  name: string;
  subFiles: File[]; // Subfiles are treated as files
}

@Component({
  selector: 'app-crf-template',
  templateUrl: './crf-template.component.html',
  styleUrl: './crf-template.component.css'
})

export class CrfTemplateComponent implements OnInit {
  files: File[] = []; // Store files and subfiles
  template: any;
  user = JSON.parse(localStorage.getItem('user') || '{}');

  constructor(private service: CrfTemplateService) {

  }


  ngOnInit(): void {
    console.log("study Id : ", this.user.studyId)
    this.loadDefaultFiles();
  }


  // Load default files (mock data for now)
  loadDefaultFiles(): void {
    this.service.getTemplateByStudyId(this.user.studyId).subscribe((template: any) => {
      this.template = template;
      this.service.getTemplateFiles(template.id).subscribe((files: any) => {
        console.log("files : ", files);
        this.files = files;
      })
    });

    //this api will give ana array same as the array in the comment below
    // this.files = [
    //   {
    //     id: '1',
    //     name: 'Inclusion',
    //     subFiles: []
    //   },
    //   {
    //     id: '2',
    //     name: 'Exclusion',
    //     subFiles: []
    //   },
    //   {
    //     id: '3',
    //     name: 'Baseline',
    //     subFiles: []
    //   },
    //   {
    //     id: '4',
    //     name: 'End of Study',
    //     subFiles: []
    //   }
    // ];
  }


  addFile(): void {
    const fileName = prompt('Enter file name:');
    if (fileName) {
      const payload = {
        crfTemplateId: this.template.id,
        name: fileName
      };

      this.service.addFileToTemplate(this.template.id, payload).subscribe((newFile: any) => {
        this.loadDefaultFiles();
        // this.files.push(newFile); // Update the local files array
      });
    }
  }

  addSubFile(fileId: string): void {
    const subFileName = prompt('Enter subfile name:');
    if (subFileName) {
      const payload = {
        crfTemplateId: this.template.id,
        name: subFileName,
        parentFileId: fileId
      };

      this.service.addSubFileToTemplate(this.template.id, payload).subscribe((newSubFile: any) => {
        this.loadDefaultFiles();
        // const file = this.files.find(f => f.id === fileId);
        // if (file) {
        //   file.subFiles.push(newSubFile); // Update the local files array
        // }
      });
    }
  }



  // Add a new field to a file
  addField(fileId: string): void {
    // Logic to navigate to a field management page or open a modal
    console.log(`Add field to file with ID: ${fileId}`);
  }
}

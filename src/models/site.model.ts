export class SiteModel {
  id: any;
  name: string;
  location: string;
  studyId: string;

  constructor(id: any, name: string, location: string, studyId: string) {
    this.id = id;
    this.name = name;
    this.location = location;
    this.studyId = studyId;
  }
}

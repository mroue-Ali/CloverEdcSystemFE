export class StudyModel {
  id: any;
  name: string;
  status: string;
  protocol: string;

  constructor(id: any, name: string, status: string, protocol: string) {
    this.id = id;
    this.name = name;
    this.status = status;
    this.protocol = protocol;
  }
}

export class DmModel {
  id: number;
  userName: string;
  email: string;
  role: string;
  siteId: string;
  studyId:string
  constructor(id: number, userName: string, role: string,email: string,siteId: string,studyId: string) {
    this.id = id;
    this.userName = userName;
    this.email = email;
    this.role = role;
    this.siteId = siteId;
    this.studyId = studyId;
  }
}

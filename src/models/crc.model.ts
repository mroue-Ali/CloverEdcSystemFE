export class CrcModel {
  id: number;
  userName: string;
  email: string;
  role: string;
  studyId:string
  constructor(id: number, userName: string, role: string,email: string,studyId: string) {
    this.id = id;
    this.userName = userName;
    this.email = email;
    this.role = role;
    this.studyId = studyId;
  }
}

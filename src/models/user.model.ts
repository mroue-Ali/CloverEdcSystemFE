export class UserModel {
  id: number;
  userName: string;
  email: string;
  role: string;

  constructor(id: number, userName: string, role: string,email: string) {
    this.id = id;
    this.userName = userName;
    this.email = email;
    this.role = role;
  }
}

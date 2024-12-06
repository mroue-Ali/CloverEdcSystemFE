import { TableConfig } from '../../models/tableConfig.model';
import { Action } from '../../models/action.model';

export const UsersConfig: TableConfig = {
  pageTitle: 'User Management',
  columns: [
    { name: 'userName', header: 'Username', sortable: true },
    { name: 'email', header: 'Email', sortable: true },
    { name: 'role.name', header: 'Role', type: 'text' }
  ],
  actions: [

  ],
  addable: false,
  filterable : true,
  refreshable: true,
  exportable: false,
  pagination: true,
};

import { TableConfig } from '../../models/tableConfig.model';
import { Action } from '../../models/action.model';

export const PisConfig: TableConfig = {
  pageTitle: 'PIs',
  columns: [
    // { name: 'user.firstName +++ user.lastName', header: 'Name', sortable: true },
    { name: 'user.userName', header: 'UserName', sortable: true },
    { name: 'user.email', header: 'Email', type: 'text' },
    { name: 'sitesStr', header: 'Sites', type: 'text' },
  ],
  actions: [
    // {
    //   icon: 'edit',
    //   name: 'Edit',
    //   class: 'primary',
    //   action: (row) => console.log('Edit user:', row), // Placeholder action
    //   condition: (row) => true
    // },
    // {
    //   icon: 'delete',
    //   name: 'Delete',
    //   class: 'danger',
    //   action: (row) => console.log('Delete user:', row), // Placeholder action
    //   condition: (row) => row.role.name !== 'Admin'
    // }
  ],
  addable: false,
  filterable : true,
  refreshable: true,
  exportable: false,
  pagination: true,
};

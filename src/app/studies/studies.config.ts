import { TableConfig } from '../../models/tableConfig.model';
import { Action } from '../../models/action.model';

export const StudiesConfig: TableConfig = {
  pageTitle: 'Studies',
  columns: [
    { name: 'name', header: 'Name', sortable: true },
    { name: 'status', header: 'Status', sortable: true },
    { name: 'protocol.name', header: 'Protocol', type: 'text' },
    // { name: 'hasAdmin', header: 'Has Admin user?', type: 'boolean' }
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
  addable: true,
  filterable : false,
  refreshable: true,
  exportable: false,
  pagination: true,
};

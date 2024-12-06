import { TableConfig } from '../../models/tableConfig.model';
import { Action } from '../../models/action.model';

export const SitesConfig: TableConfig = {
  pageTitle: 'Sites',
  columns: [
    { name: 'name', header: 'Name', sortable: true },
    { name: 'location', header: 'Location', sortable: true },
    { name: 'study.name', header: 'Study', type: 'text' },
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

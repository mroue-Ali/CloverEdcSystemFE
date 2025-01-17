import { TableConfig } from '../../models/tableConfig.model';
import { Action } from '../../models/action.model';

export const ProtocolsConfig: TableConfig = {
  pageTitle: 'Protocols',
  columns: [
    { name: 'name', header: 'Name', sortable: true },
    { name: 'numOfVisits', header: 'Number of Visits', sortable: true },
    { name: 'randomization', header: 'Randomization?', type: 'boolean' }
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
  filterable : true,
  refreshable: true,
  exportable: false,
  pagination: true,
};

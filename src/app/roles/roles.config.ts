import { TableConfig } from '../../models/tableConfig.model';

export const RolesConfig: TableConfig = {
  pageTitle: 'Roles Management',
  columns: [
    { name: 'name', header: 'Username', sortable: true },
  ],
  actions: [
  ],
  addable: true,
  refreshable: true,
  exportable: false,
  pagination: true,
};

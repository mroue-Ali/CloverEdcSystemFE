import { TableConfig } from '../../models/tableConfig.model';

export const PatientConfig: TableConfig = {
  pageTitle: 'patient Management',
  columns: [
    { name: 'name', header: 'Name', sortable: true },
    { name: 'id', header: 'Patient', sortable: true },
    { name: 'code', header: 'Code', sortable: true },
    { name: 'siteId', header: 'Site', sortable: true },
  ],
  actions: [
  ],
  addable: true,
  refreshable: true,
  exportable: false,
  filterable:true,
  pagination: true,
};

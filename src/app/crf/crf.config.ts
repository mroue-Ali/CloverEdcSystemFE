import { TableConfig } from '../../models/tableConfig.model';

export const CrfConfig: TableConfig = {
  pageTitle: 'crf Management',
  columns: [
    { name: 'crcId', header: 'CRC', sortable: true },
    { name: 'patientId', header: 'Patient', sortable: true },
  ],
  actions: [
  ],
  addable: true,
  refreshable: true,
  exportable: false,
  filterable:true,
  pagination: true,
};

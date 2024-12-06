import { Action } from './action.model';

/**
 * Interface representing a column configuration for a table.
 */
export interface TableColumn {
  name: any; // Name of the column
  header: any; // Header text or component for the column
  mobile?: boolean; // Indicates if the column is visible on mobile devices
  title?: boolean; // Indicates if the column is a title column
  icon?: any; // Icon for the column
  class?: any; // CSS class for styling the column
  warning?: boolean; // Indicates if the column has a warning
  conditionalClass?: (row: any) => string; // Function to conditionally apply CSS class based on row data
  extra?: boolean; // Indicates if the column is extra information
  type?:
    | 'text'
    | 'time'
    | 'image'
    | 'currency'
    | 'boolean'
    | 'date'
    | 'datetime'
    | 'file'
    | 'location'
    | 'link';
  sortable?: boolean; // Indicates if the column is sortable
}

/**
 * Interface representing configuration for expanded data in a table.
 */

export interface TableConfig {
  showActionsMenuMobile?: boolean; // Indicates if actions menu is visible on mobile devices
  totalCount?: number; // Total count of items in the table
  pageTitle?: any; // Title for the table page
  mobTitle?: any; // Mobile title for the table
  mobSubTitle?: any; // Mobile subtitle for the table
  mobTertiaryTitle?: any; // Mobile tertiary title for the table
  columns?: TableColumn[]; // Array of table columns
  class?: string; // CSS class for styling
  columnNames?: string[]; // Array of column names
  image?: any; // Image for the table
  removable?: boolean; // Indicates if items are removable from the table
  addable?: boolean; // Indicates if items are addable to the table
  refreshable?: boolean; // Indicates if the table is refreshable
  exportable?: boolean; // Indicates if the table is exportable
  filterable?: boolean; // Indicates if the table is filterable
  formConfig?: any; // Configuration for a form
  headerFormInitialData?: any; // Initial data for the header form
  actions?: Action[]; // Array of actions for the table
  showHeadersMobile?: boolean; // Function to check if a row can be expanded
  imageClass?: any;
  pagination?: boolean; // Enable or disable pagination
}

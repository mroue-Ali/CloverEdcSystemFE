export interface Action {
  icon: string;
  name: string;
  group?: string;
  class: string;
  status?: 'hidden' | 'primary' | string;
  action: (row: any) => any;
  condition: (argument: any) => any;
}

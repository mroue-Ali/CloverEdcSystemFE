export interface BaseField {
  id: string;
  fieldName: string;
  typeId: string;
  typeName?: string; // For display
  dropDownOptions?: string[]; // For dropdown fields
  type?:any;
}

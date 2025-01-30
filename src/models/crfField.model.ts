export interface CrfField {
  id: string;
  fileId: string;
  fieldName: string;
  typeName: string;
  baseField: any;
  baseFieldId: string;
  required?: boolean;
  requiredFieldId: string;
  requiredFieldValue: string;
  options?: string[];
  dropDownOptions?: any;
}

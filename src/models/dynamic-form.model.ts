export interface PhoneInputControlNames {
  phoneNumber: any;
  countryCode: any;
}

export interface StepperElement {
  title: string;
  type: 'form' | 'message' | string;
  formConfig?: DynamicFormField[][] | any;
  initialData?: any;
  formClass?: string;
  disabled?: boolean;
}

export interface DynamicFormField {
  type:
    | 'text'
    | 'number'
    | 'email'
    | 'password'
    | 'date'
    | 'time'
    | 'select'
    | 'subtitle'
    | 'phoneNumber'
    | 'chip'
    | 'file'
    | 'textarea'
    | 'autocomplete'
    | 'checkbox'
    | 'toggle'
    | 'datetime'
    | string;

  controlName: string;
  label?: any;
  value?: any;
  icon?: any;
  options?: {
    label: any;
    value: any;
    color?: any;
  }[];
  controlNames?: PhoneInputControlNames;
  required?: boolean;
  disabled?: boolean;
  hidden?: boolean;
  showOptionalSection?: boolean;
  min?: any;
  max?: any;
  stepIndex?: number;
  rowIndex?: number;
  multiple?: any;
  searchable?: any;
  suggestions?: any;
  toggle?: boolean;
  scrollable?: boolean;
  toggleLabel?: string;
  toggleValue?: boolean;
  color?: any;
  autoSearch?: any;
  minuteValues?: string;
  colSize?: number;
  validators?: {
    isUrl?: boolean;
  };
}

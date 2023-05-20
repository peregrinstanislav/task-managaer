export interface JsonFormValidators {
  min?: number;
  max?: number;
  required?: boolean;
  requiredTrue?: boolean;
  email?: boolean;
  minLength?: boolean;
  maxLength?: boolean;
  pattern?: string;
  nullValidator?: boolean;
}

export interface JsonFormControlOptions {
  min?: string;
  max?: string;
  step?: string;
  icon?: string;
}

export interface JsonFormControls {
  name: string;
  type: string;
  objectPath: string;
  options?: JsonFormControlOptions;
  validators: JsonFormValidators;
}

export interface FormType {
  key: string;
  formControls: JsonFormControls[];
}

export interface JsonForm {
  forms: FormType[];
}

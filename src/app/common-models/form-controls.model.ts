
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
    options?: JsonFormControlOptions;
    validators: JsonFormValidators;
}

export interface FormType {
    key: string;
    values: string[];
}

export interface JsonForm {
    forms: FormType[];
    formControls: JsonFormControls[]
}
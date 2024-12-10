export interface FormField {
  id: string;
  type: 'text' | 'number' | 'date' | 'checkbox' | 'select' | 'radio';
  label: string;
  required: boolean;
  options?: string[]; // For select and radio
  placeholder?: string;
}

export interface Form {
  id: string;
  title: string;
  description: string;
  fields: FormField[];
  createdAt: Date;
  updatedAt: Date;
}

export interface FormResponse {
  id: string;
  formId: string;
  responses: Record<string, any>;
  submittedAt: Date;
}
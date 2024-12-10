import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { Form, FormResponse } from '../types/form';

interface FormStore {
  forms: Form[];
  responses: FormResponse[];
  createForm: (title: string, description: string) => Form;
  updateForm: (form: Form) => void;
  deleteForm: (id: string) => void;
  submitResponse: (formId: string, responses: Record<string, any>) => void;
  getFormResponses: (formId: string) => FormResponse[];
}

export const useFormStore = create<FormStore>((set, get) => ({
  forms: [],
  responses: [],
  
  createForm: (title, description) => {
    const newForm: Form = {
      id: uuidv4(),
      title,
      description,
      fields: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    set((state) => ({ forms: [...state.forms, newForm] }));
    return newForm;
  },
  
  updateForm: (form) => {
    set((state) => ({
      forms: state.forms.map((f) => (f.id === form.id ? { ...form, updatedAt: new Date() } : f)),
    }));
  },
  
  deleteForm: (id) => {
    set((state) => ({
      forms: state.forms.filter((f) => f.id !== id),
      responses: state.responses.filter((r) => r.formId !== id),
    }));
  },
  
  submitResponse: (formId, responses) => {
    const newResponse: FormResponse = {
      id: uuidv4(),
      formId,
      responses,
      submittedAt: new Date(),
    };
    
    set((state) => ({
      responses: [...state.responses, newResponse],
    }));
  },
  
  getFormResponses: (formId) => {
    return get().responses.filter((r) => r.formId === formId);
  },
}));
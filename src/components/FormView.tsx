import React from 'react';
import { Form, FormResponse } from '../types/form';

interface FormViewProps {
  form: Form;
  onSubmit: (responses: Record<string, any>) => void;
}

export const FormView: React.FC<FormViewProps> = ({ form, onSubmit }) => {
  const [responses, setResponses] = React.useState<Record<string, any>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(responses);
  };

  const handleInputChange = (fieldId: string, value: any) => {
    setResponses((prev) => ({
      ...prev,
      [fieldId]: value,
    }));
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-2">{form.title}</h1>
      <p className="text-gray-600 mb-6">{form.description}</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {form.fields.map((field) => (
          <div key={field.id} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>

            {field.type === 'text' && (
              <input
                type="text"
                required={field.required}
                value={responses[field.id] || ''}
                onChange={(e) => handleInputChange(field.id, e.target.value)}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder={field.placeholder}
              />
            )}

            {field.type === 'number' && (
              <input
                type="number"
                required={field.required}
                value={responses[field.id] || ''}
                onChange={(e) => handleInputChange(field.id, e.target.value)}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
            )}

            {field.type === 'date' && (
              <input
                type="date"
                required={field.required}
                value={responses[field.id] || ''}
                onChange={(e) => handleInputChange(field.id, e.target.value)}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
            )}

            {field.type === 'checkbox' && (
              <div className="flex items-center">
                <input
                  type="checkbox"
                  required={field.required}
                  checked={responses[field.id] || false}
                  onChange={(e) => handleInputChange(field.id, e.target.checked)}
                  className="h-4 w-4 text-blue-500 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-gray-600">{field.label}</span>
              </div>
            )}

            {field.type === 'select' && (
              <select
                required={field.required}
                value={responses[field.id] || ''}
                onChange={(e) => handleInputChange(field.id, e.target.value)}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select an option</option>
                {field.options?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            )}

            {field.type === 'radio' && (
              <div className="space-y-2">
                {field.options?.map((option) => (
                  <div key={option} className="flex items-center">
                    <input
                      type="radio"
                      required={field.required}
                      name={field.id}
                      value={option}
                      checked={responses[field.id] === option}
                      onChange={(e) => handleInputChange(field.id, e.target.value)}
                      className="h-4 w-4 text-blue-500 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-gray-600">{option}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
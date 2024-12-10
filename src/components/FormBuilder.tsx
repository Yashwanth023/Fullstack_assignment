import React from 'react';
import { Plus, Trash2, Save } from 'lucide-react';
import { Form, FormField } from '../types/form';
import { v4 as uuidv4 } from 'uuid';

interface FormBuilderProps {
  form: Form;
  onSave: (form: Form) => void;
}

export const FormBuilder: React.FC<FormBuilderProps> = ({ form, onSave }) => {
  const [formData, setFormData] = React.useState<Form>(form);

  const addField = (type: FormField['type']) => {
    const newField: FormField = {
      id: uuidv4(),
      type,
      label: `New ${type} field`,
      required: false,
      options: type === 'select' || type === 'radio' ? ['Option 1'] : undefined,
    };

    setFormData({
      ...formData,
      fields: [...formData.fields, newField],
    });
  };

  const updateField = (fieldId: string, updates: Partial<FormField>) => {
    setFormData({
      ...formData,
      fields: formData.fields.map((field) =>
        field.id === fieldId ? { ...field, ...updates } : field
      ),
    });
  };

  const removeField = (fieldId: string) => {
    setFormData({
      ...formData,
      fields: formData.fields.filter((field) => field.id !== fieldId),
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="text-2xl font-bold w-full mb-2 p-2 border-b-2 border-gray-200 focus:border-blue-500 outline-none"
          placeholder="Form Title"
        />
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full p-2 border-b-2 border-gray-200 focus:border-blue-500 outline-none resize-none"
          placeholder="Form Description"
          rows={2}
        />
      </div>

      <div className="space-y-4">
        {formData.fields.map((field) => (
          <div key={field.id} className="p-4 border rounded-lg bg-gray-50">
            <div className="flex items-center justify-between mb-2">
              <input
                type="text"
                value={field.label}
                onChange={(e) => updateField(field.id, { label: e.target.value })}
                className="text-lg font-medium bg-transparent border-b border-gray-300 focus:border-blue-500 outline-none"
              />
              <button
                onClick={() => removeField(field.id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 size={20} />
              </button>
            </div>

            <div className="flex items-center gap-4 mt-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={field.required}
                  onChange={(e) => updateField(field.id, { required: e.target.checked })}
                  className="rounded text-blue-500"
                />
                Required
              </label>
            </div>

            {(field.type === 'select' || field.type === 'radio') && (
              <div className="mt-2">
                {field.options?.map((option, index) => (
                  <input
                    key={index}
                    type="text"
                    value={option}
                    onChange={(e) => {
                      const newOptions = [...(field.options || [])];
                      newOptions[index] = e.target.value;
                      updateField(field.id, { options: newOptions });
                    }}
                    className="block w-full mt-1 p-2 border rounded"
                    placeholder={`Option ${index + 1}`}
                  />
                ))}
                <button
                  onClick={() => {
                    const newOptions = [...(field.options || []), ''];
                    updateField(field.id, { options: newOptions });
                  }}
                  className="mt-2 text-sm text-blue-500 hover:text-blue-700"
                >
                  Add Option
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <button
          onClick={() => addField('text')}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg"
        >
          <Plus size={20} /> Text
        </button>
        <button
          onClick={() => addField('number')}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg"
        >
          <Plus size={20} /> Number
        </button>
        <button
          onClick={() => addField('date')}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg"
        >
          <Plus size={20} /> Date
        </button>
        <button
          onClick={() => addField('checkbox')}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg"
        >
          <Plus size={20} /> Checkbox
        </button>
        <button
          onClick={() => addField('select')}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg"
        >
          <Plus size={20} /> Dropdown
        </button>
        <button
          onClick={() => addField('radio')}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg"
        >
          <Plus size={20} /> Radio
        </button>
      </div>

      <div className="mt-6">
        <button
          onClick={() => onSave(formData)}
          className="flex items-center gap-2 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          <Save size={20} /> Save Form
        </button>
      </div>
    </div>
  );
};
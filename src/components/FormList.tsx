import React from 'react';
import { Link } from 'react-router-dom';
import { Form } from '../types/form';
import { FileText, Share2, Trash2, Edit } from 'lucide-react';

interface FormListProps {
  forms: Form[];
  onDelete: (id: string) => void;
}

export const FormList: React.FC<FormListProps> = ({ forms, onDelete }) => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {forms.map((form) => (
        <div
          key={form.id}
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {form.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4">{form.description}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  const url = `${window.location.origin}/form/${form.id}`;
                  navigator.clipboard.writeText(url);
                }}
                className="p-2 text-gray-500 hover:text-blue-500 rounded-full hover:bg-gray-100"
                title="Copy share link"
              >
                <Share2 size={20} />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4 pt-4 border-t">
            <div className="flex items-center text-sm text-gray-500">
              <FileText size={16} className="mr-1" />
              {form.fields.length} fields
            </div>
            <div className="flex gap-2">
              <Link
                to={`/form/${form.id}/edit`}
                className="p-2 text-gray-500 hover:text-blue-500 rounded-full hover:bg-gray-100"
              >
                <Edit size={20} />
              </Link>
              <Link
                to={`/form/${form.id}/responses`}
                className="p-2 text-gray-500 hover:text-green-500 rounded-full hover:bg-gray-100"
              >
                <FileText size={20} />
              </Link>
              <button
                onClick={() => onDelete(form.id)}
                className="p-2 text-gray-500 hover:text-red-500 rounded-full hover:bg-gray-100"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
import React from 'react';
import { Form, FormResponse } from '../types/form';
import { Download } from 'lucide-react';

interface ResponseListProps {
  form: Form;
  responses: FormResponse[];
}

export const ResponseList: React.FC<ResponseListProps> = ({ form, responses }) => {
  const exportCSV = () => {
    const headers = ['Submitted At', ...form.fields.map((f) => f.label)];
    const rows = responses.map((response) => [
      new Date(response.submittedAt).toLocaleString(),
      ...form.fields.map((field) => response.responses[field.id] || ''),
    ]);

    const csv = [
      headers.join(','),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(',')),
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${form.title}-responses.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-6 border-b">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">{form.title} - Responses</h2>
          <button
            onClick={exportCSV}
            className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            <Download size={20} /> Export CSV
          </button>
        </div>
        <p className="text-gray-600 mt-2">{responses.length} responses</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Submitted At
              </th>
              {form.fields.map((field) => (
                <th
                  key={field.id}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {field.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {responses.map((response) => (
              <tr key={response.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(response.submittedAt).toLocaleString()}
                </td>
                {form.fields.map((field) => (
                  <td
                    key={field.id}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                  >
                    {field.type === 'checkbox'
                      ? response.responses[field.id]
                        ? '✓'
                        : '✗'
                      : response.responses[field.id]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
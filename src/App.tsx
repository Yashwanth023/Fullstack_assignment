import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { FormSquare, Plus } from 'lucide-react';
import { useFormStore } from './store/formStore';
import { FormBuilder } from './components/FormBuilder';
import { FormList } from './components/FormList';
import { FormView } from './components/FormView';
import { ResponseList } from './components/ResponseList';

function App() {
  const { forms, createForm, updateForm, deleteForm, submitResponse, getFormResponses } = useFormStore();

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link to="/" className="flex items-center gap-2 text-xl font-bold text-gray-800">
                  <FormSquare className="h-6 w-6" />
                  Form Builder
                </Link>
              </div>
              <div className="flex items-center">
                <Link
                  to="/new"
                  className="flex items-center gap-2 px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600"
                >
                  <Plus className="h-5 w-5" />
                  New Form
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route
              path="/"
              element={<FormList forms={forms} onDelete={deleteForm} />}
            />
            <Route
              path="/new"
              element={
                <FormBuilder
                  form={{
                    id: '',
                    title: '',
                    description: '',
                    fields: [],
                    createdAt: new Date(),
                    updatedAt: new Date(),
                  }}
                  onSave={(form) => {
                    const newForm = createForm(form.title, form.description);
                    updateForm({ ...form, id: newForm.id });
                  }}
                />
              }
            />
            <Route
              path="/form/:id/edit"
              element={
                <FormBuilder
                  form={forms.find((f) => f.id === window.location.pathname.split('/')[2])!}
                  onSave={updateForm}
                />
              }
            />
            <Route
              path="/form/:id"
              element={
                <FormView
                  form={forms.find((f) => f.id === window.location.pathname.split('/')[2])!}
                  onSubmit={(responses) => {
                    submitResponse(window.location.pathname.split('/')[2], responses);
                    alert('Form submitted successfully!');
                    window.location.href = '/';
                  }}
                />
              }
            />
            <Route
              path="/form/:id/responses"
              element={
                <ResponseList
                  form={forms.find((f) => f.id === window.location.pathname.split('/')[2])!}
                  responses={getFormResponses(window.location.pathname.split('/')[2])}
                />
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
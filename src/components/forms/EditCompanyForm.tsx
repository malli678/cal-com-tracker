import React, { useState } from 'react';
import { Company } from '../../types';
import { Plus, Trash2 } from 'lucide-react';

interface EditCompanyFormProps {
  company: Company;
  onSubmit: (company: Omit<Company, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
}

export const EditCompanyForm: React.FC<EditCompanyFormProps> = ({
  company,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState({
    name: company.name,
    location: company.location,
    linkedinProfile: company.linkedinProfile,
    emails: [...company.emails],
    phoneNumbers: [...company.phoneNumbers],
    comments: company.comments,
    communicationPeriodicity: company.communicationPeriodicity,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      updatedAt: new Date().toISOString(),
    });
  };

  const addField = (field: 'emails' | 'phoneNumbers') => {
    setFormData({
      ...formData,
      [field]: [...formData[field], ''],
    });
  };

  const removeField = (field: 'emails' | 'phoneNumbers', index: number) => {
    setFormData({
      ...formData,
      [field]: formData[field].filter((_, i) => i !== index),
    });
  };

  const updateField = (
    field: 'emails' | 'phoneNumbers',
    index: number,
    value: string
  ) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData({
      ...formData,
      [field]: newArray,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Company Name *
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            LinkedIn Profile
          </label>
          <input
            type="url"
            value={formData.linkedinProfile}
            onChange={(e) =>
              setFormData({ ...formData, linkedinProfile: e.target.value })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Communication Periodicity (days)
          </label>
          <input
            type="number"
            min="1"
            value={formData.communicationPeriodicity}
            onChange={(e) =>
              setFormData({
                ...formData,
                communicationPeriodicity: parseInt(e.target.value),
              })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Emails</label>
        {formData.emails.map((email, index) => (
          <div key={index} className="flex mt-1 space-x-2">
            <input
              type="email"
              value={email}
              onChange={(e) => updateField('emails', index, e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            {index > 0 && (
              <button
                type="button"
                onClick={() => removeField('emails', index)}
                className="p-2 text-red-600 hover:text-red-800"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={() => addField('emails')}
          className="mt-2 inline-flex items-center text-sm text-indigo-600 hover:text-indigo-800"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Email
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Phone Numbers
        </label>
        {formData.phoneNumbers.map((phone, index) => (
          <div key={index} className="flex mt-1 space-x-2">
            <input
              type="tel"
              value={phone}
              onChange={(e) => updateField('phoneNumbers', index, e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            {index > 0 && (
              <button
                type="button"
                onClick={() => removeField('phoneNumbers', index)}
                className="p-2 text-red-600 hover:text-red-800"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={() => addField('phoneNumbers')}
          className="mt-2 inline-flex items-center text-sm text-indigo-600 hover:text-indigo-800"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Phone Number
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Comments
        </label>
        <textarea
          value={formData.comments}
          onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};
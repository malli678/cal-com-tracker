import React from 'react';
import { useStore } from '../store';
import { Company } from '../types';
import { CompanyForm } from './forms/CompanyForm';

const AdminModule = () => {
  const { companies, communicationMethods, addCompany, setCommunicationMethods } =
    useStore();

  const handleAddCompany = (
    companyData: Omit<Company, 'id' | 'createdAt' | 'updatedAt'>
  ) => {
    const newCompany: Company = {
      id: crypto.randomUUID(),
      ...companyData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    addCompany(newCompany);
  };

  const handleMethodUpdate = (
    methodId: string,
    field: keyof typeof communicationMethods[0],
    value: string | number | boolean
  ) => {
    const updatedMethods = communicationMethods.map((method) =>
      method.id === methodId ? { ...method, [field]: value } : method
    );
    setCommunicationMethods(updatedMethods);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Company Management
        </h2>
        <div className="bg-white shadow-md rounded-lg p-6">
          <CompanyForm onSubmit={handleAddCompany} />
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Communication Methods
        </h2>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Method
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sequence
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mandatory
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {communicationMethods.map((method) => (
                <tr key={method.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="text"
                      value={method.name}
                      onChange={(e) =>
                        handleMethodUpdate(method.id, 'name', e.target.value)
                      }
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="text"
                      value={method.description}
                      onChange={(e) =>
                        handleMethodUpdate(
                          method.id,
                          'description',
                          e.target.value
                        )
                      }
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="number"
                      value={method.sequence}
                      onChange={(e) =>
                        handleMethodUpdate(
                          method.id,
                          'sequence',
                          parseInt(e.target.value)
                        )
                      }
                      className="block w-40 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={method.isMandatory}
                      onChange={(e) =>
                        handleMethodUpdate(
                          method.id,
                          'isMandatory',
                          e.target.checked
                        )
                      }
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminModule;
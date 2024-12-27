import React, { useState } from 'react';
import { useStore } from '../store';
import { format } from 'date-fns';
import { MessageSquarePlus, Trash2, Edit, EyeOff } from 'lucide-react';
import { CommunicationModal } from './CommunicationModal';
import { EditCompanyForm } from './forms/EditCompanyForm';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { motion, AnimatePresence } from 'framer-motion';

const Dashboard = () => {
  const {
    companies,
    communications,
    communicationMethods,
    highlightOverrides,
    deleteCompany,
    updateCompany,
    toggleHighlightOverride,
  } = useStore();
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [showCommunicationModal, setShowCommunicationModal] = useState(false);
  const [editingCompany, setEditingCompany] = useState<string | null>(null);

  const getLastFiveCommunications = (companyId: string) => {
    return communications
      .filter((comm) => comm.companyId === companyId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5);
  };

  const getNextScheduledCommunication = (company: Company) => {
    const lastComm = communications
      .filter((comm) => comm.companyId === company.id)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];

    if (!lastComm) return null;

    const nextDate = new Date(lastComm.date);
    nextDate.setDate(nextDate.getDate() + company.communicationPeriodicity);

    return {
      date: nextDate,
      method: communicationMethods[0],
    };
  };

  const getCommunicationStatus = (company: Company) => {
    if (highlightOverrides[company.id]) return 'none';

    const nextComm = getNextScheduledCommunication(company);
    if (!nextComm) return 'none';

    const today = new Date();
    const diffDays = Math.floor(
      (nextComm.date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffDays < 0) return 'overdue';
    if (diffDays === 0) return 'today';
    return 'upcoming';
  };

  const handleDeleteCompany = (companyId: string) => {
    if (window.confirm('Are you sure you want to delete this company and all its communications?')) {
      deleteCompany(companyId);
    }
  };

  const toggleCompanySelection = (companyId: string) => {
    setSelectedCompanies((prev) =>
      prev.includes(companyId)
        ? prev.filter((id) => id !== companyId)
        : [...prev, companyId]
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        {selectedCompanies.length > 0 && (
          <Button
            onClick={() => setShowCommunicationModal(true)}
            icon={MessageSquarePlus}
          >
            Log Communication
          </Button>
        )}
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="w-12 px-6 py-3">
                  <input
                    type="checkbox"
                    checked={selectedCompanies.length === companies.length && companies.length > 0}
                    onChange={(e) =>
                      setSelectedCompanies(e.target.checked ? companies.map((c) => c.id) : [])
                    }
                    className="h-4 w-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Five Communications
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Next Scheduled
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <AnimatePresence>
                {companies.map((company) => {
                  const status = getCommunicationStatus(company);
                  const statusColors = {
                    overdue: 'bg-red-50',
                    today: 'bg-yellow-50',
                    upcoming: 'bg-white',
                    none: 'bg-white',
                  };

                  if (editingCompany === company.id) {
                    return (
                      <tr key={company.id}>
                        <td colSpan={6} className="px-6 py-4">
                          <EditCompanyForm
                            company={company}
                            onSubmit={(updates) => {
                              updateCompany(company.id, updates);
                              setEditingCompany(null);
                            }}
                            onCancel={() => setEditingCompany(null)}
                          />
                        </td>
                      </tr>
                    );
                  }

                  return (
                    <motion.tr
                      key={company.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className={`${statusColors[status]} hover:bg-gray-50 transition-colors`}
                    >
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={selectedCompanies.includes(company.id)}
                          onChange={() => toggleCompanySelection(company.id)}
                          className="h-4 w-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">
                          {company.name}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          {getLastFiveCommunications(company.id).map((comm) => {
                            const method = communicationMethods.find(
                              (m) => m.id === comm.methodId
                            );
                            return (
                              <div
                                key={comm.id}
                                className="text-xs bg-gray-100 rounded-lg px-2 py-1 cursor-help transition-transform hover:scale-105"
                                title={`${method?.name}: ${comm.notes}`}
                              >
                                {format(new Date(comm.date), 'MMM d')}
                              </div>
                            );
                          })}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {getNextScheduledCommunication(company) && (
                          <div className="text-sm text-gray-900">
                            {format(
                              getNextScheduledCommunication(company)!.date,
                              'MMM d, yyyy'
                            )}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            status === 'overdue'
                              ? 'bg-red-100 text-red-800'
                              : status === 'today'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-green-100 text-green-800'
                          }`}
                        >
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setEditingCompany(company.id)}
                            className="text-indigo-600 hover:text-indigo-900 transition-colors"
                          >
                            <Edit className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => toggleHighlightOverride(company.id)}
                            className={`${
                              highlightOverrides[company.id]
                                ? 'text-gray-600'
                                : 'text-gray-400'
                            } hover:text-gray-900 transition-colors`}
                          >
                            <EyeOff className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleDeleteCompany(company.id)}
                            className="text-red-600 hover:text-red-900 transition-colors"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </Card>

      <AnimatePresence>
        {showCommunicationModal && (
          <CommunicationModal
            selectedCompanies={selectedCompanies}
            onClose={() => {
              setShowCommunicationModal(false);
              setSelectedCompanies([]);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
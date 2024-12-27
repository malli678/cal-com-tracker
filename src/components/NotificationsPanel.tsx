import React from 'react';
import { useStore } from '../store';
import { format } from 'date-fns';
import { Bell } from 'lucide-react';

export const NotificationsPanel: React.FC = () => {
  const { companies, communications } = useStore();

  const getOverdueCommunications = () => {
    return companies
      .map((company) => {
        const lastComm = communications
          .filter((c) => c.companyId === company.id)
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];

        if (!lastComm) return null;

        const nextDate = new Date(lastComm.date);
        nextDate.setDate(nextDate.getDate() + company.communicationPeriodicity);

        if (nextDate < new Date()) {
          return {
            company,
            daysOverdue: Math.floor(
              (new Date().getTime() - nextDate.getTime()) / (1000 * 60 * 60 * 24)
            ),
          };
        }
        return null;
      })
      .filter(Boolean);
  };

  const getDueTodayCommunications = () => {
    return companies
      .map((company) => {
        const lastComm = communications
          .filter((c) => c.companyId === company.id)
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];

        if (!lastComm) return null;

        const nextDate = new Date(lastComm.date);
        nextDate.setDate(nextDate.getDate() + company.communicationPeriodicity);

        if (
          nextDate.toDateString() === new Date().toDateString()
        ) {
          return { company };
        }
        return null;
      })
      .filter(Boolean);
  };

  const overdue = getOverdueCommunications();
  const dueToday = getDueTodayCommunications();
  const totalNotifications = overdue.length + dueToday.length;

  return (
    <div className="relative">
      <button className="relative p-2">
        <Bell className="h-6 w-6 text-gray-600" />
        {totalNotifications > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
            {totalNotifications}
          </span>
        )}
      </button>

      {totalNotifications > 0 && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="p-4">
            {overdue.length > 0 && (
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-900">Overdue</h3>
                <div className="mt-2 space-y-2">
                  {overdue.map(({ company, daysOverdue }) => (
                    <div
                      key={company.id}
                      className="p-2 bg-red-50 rounded text-sm"
                    >
                      <span className="font-medium">{company.name}</span>
                      <span className="text-red-600 ml-2">
                        {daysOverdue} days overdue
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {dueToday.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-900">Due Today</h3>
                <div className="mt-2 space-y-2">
                  {dueToday.map(({ company }) => (
                    <div
                      key={company.id}
                      className="p-2 bg-yellow-50 rounded text-sm"
                    >
                      <span className="font-medium">{company.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
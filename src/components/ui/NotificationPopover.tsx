import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../../store';

export const NotificationPopover = () => {
  const [isOpen, setIsOpen] = useState(false);
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

        if (nextDate.toDateString() === new Date().toDateString()) {
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
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
      >
        <Bell className="h-6 w-6 text-gray-600" />
        {totalNotifications > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full"
          >
            {totalNotifications}
          </motion.span>
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute right-0 mt-2 w-96 bg-white/90 rounded-2xl shadow-xl ring-1 ring-black/5 backdrop-blur-xl z-50"
              style={{ 
                transformOrigin: 'top right'
              }}
            >
              <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    ✕
                  </button>
                </div>

                {overdue.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Overdue</h4>
                    <div className="space-y-2">
                      {overdue.map(({ company, daysOverdue }) => (
                        <motion.div
                          key={company.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="p-3 bg-red-50/80 backdrop-blur-sm rounded-xl text-sm border border-red-100"
                        >
                          <span className="font-medium">{company.name}</span>
                          <span className="text-red-600 ml-2">
                            {daysOverdue} days overdue
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {dueToday.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Due Today</h4>
                    <div className="space-y-2">
                      {dueToday.map(({ company }) => (
                        <motion.div
                          key={company.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="p-3 bg-yellow-50/80 backdrop-blur-sm rounded-xl text-sm border border-yellow-100"
                        >
                          <span className="font-medium">{company.name}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {totalNotifications === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No new notifications
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
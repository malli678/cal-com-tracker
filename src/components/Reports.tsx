
import { useStore } from '../store';
import { Download } from 'lucide-react';

const Reports = () => {
  const { communications, companies, communicationMethods } = useStore();

  const getCommunicationStats = () => {
    const stats = communicationMethods.map((method) => ({
      method: method.name,
      count: communications.filter((c) => c.methodId === method.id).length,
    }));

    return stats.sort((a, b) => b.count - a.count);
  };

  const getOverdueStats = () => {
    return companies.reduce((acc, company) => {
      const lastComm = communications
        .filter((c) => c.companyId === company.id)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];

      if (!lastComm) return acc;

      const nextDate = new Date(lastComm.date);
      nextDate.setDate(nextDate.getDate() + company.communicationPeriodicity);

      if (nextDate < new Date()) {
        acc.push({
          company: company.name,
          daysOverdue: Math.floor(
            (new Date().getTime() - nextDate.getTime()) / (1000 * 60 * 60 * 24)
          ),
        });
      }

      return acc;
    }, [] as { company: string; daysOverdue: number }[]);
  };

  const getEngagementEffectiveness = () => {
    // Manually assigning the percentages as per your request.
    const effectiveness = [
      { method: 'LinkedIn Post', effectiveness: 85 },
      { method: 'Phone Call', effectiveness: 60 },
      { method: 'LinkedIn Message', effectiveness: 40 },
      { method: 'Email', effectiveness: 25 },
      { method: 'Others', effectiveness: 0 }
    ];

    return effectiveness;
  };

  const stats = getCommunicationStats();
  const overdueStats = getOverdueStats();
  const engagementStats = getEngagementEffectiveness();
  const maxCount = Math.max(...stats.map((s) => s.count));

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Reports and Analytics</h1>
        <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Communication Methods Usage */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Communication Methods Usage
          </h2>
          <div className="space-y-4">
            {stats.map((stat) => (
              <div key={stat.method}>
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>{stat.method}</span>
                  <span>{stat.count}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-indigo-600 h-2 rounded-full"
                    style={{
                      width: `${(stat.count / maxCount) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Overdue Communications */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Overdue Communications
          </h2>
          {overdueStats.length > 0 ? (
            <div className="space-y-4">
              {overdueStats.map((stat) => (
                <div
                  key={stat.company}
                  className="flex justify-between items-center p-3 bg-red-50 rounded-lg"
                >
                  <span className="text-sm font-medium text-red-800">
                    {stat.company}
                  </span>
                  <span className="text-sm text-red-600">
                    {stat.daysOverdue} days overdue
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No overdue communications</p>
          )}
        </div>

        {/* Engagement Effectiveness */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Engagement Effectiveness
          </h2>
          <div className="space-y-4">
            {engagementStats.map((stat) => (
              <div key={stat.method}>
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>{stat.method}</span>
                  <span>{stat.effectiveness}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full"
                    style={{
                      width: `${stat.effectiveness}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;

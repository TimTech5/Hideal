import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import ConsumerService from '../services/consumerService';

const DashboardPage = () => {
  const [metrics, setMetrics] = useState({
    totalConsumers: 0,
    activePromotions: 0,
    surveyCompletionRate: 0,
    recentResponses: 0
  });
  const [loading, setLoading] = useState(true);
  const [consumers, setConsumers] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const result = await ConsumerService.getConsumers(1, 5);
        setConsumers(result.data);
        
        // Mock metrics calculation
        setMetrics({
          totalConsumers: result.pagination.total,
          activePromotions: 8,
          surveyCompletionRate: 75.2,
          recentResponses: 45
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const demoData = [
    { name: 'Jan', consumers: 400 },
    { name: 'Feb', consumers: 300 },
    { name: 'Mar', consumers: 200 },
    { name: 'Apr', consumers: 278 },
    { name: 'May', consumers: 189 },
  ];

  const demographicsData = [
    { name: '18-24', value: 20 },
    { name: '25-34', value: 35 },
    { name: '35-44', value: 25 },
    { name: '45+', value: 20 }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-gray-500 text-sm font-medium">Total Consumers</h3>
            <p className="text-3xl font-bold text-gray-900 mt-2">{metrics.totalConsumers}</p>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-gray-500 text-sm font-medium">Active Promotions</h3>
            <p className="text-3xl font-bold text-gray-900 mt-2">{metrics.activePromotions}</p>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-gray-500 text-sm font-medium">Survey Completion Rate</h3>
            <p className="text-3xl font-bold text-gray-900 mt-2">{metrics.surveyCompletionRate}%</p>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-gray-500 text-sm font-medium">Recent Responses</h3>
            <p className="text-3xl font-bold text-gray-900 mt-2">{metrics.recentResponses}</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Consumer Growth</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={demoData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="consumers" fill="#0088FE" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Age Group Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={demographicsData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {demographicsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Consumers */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Consumers</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-4 font-medium text-gray-700">Name</th>
                  <th className="text-left py-2 px-4 font-medium text-gray-700">Email</th>
                  <th className="text-left py-2 px-4 font-medium text-gray-700">Age Group</th>
                  <th className="text-left py-2 px-4 font-medium text-gray-700">Registered</th>
                </tr>
              </thead>
              <tbody>
                {consumers.map((consumer) => (
                  <tr key={consumer.id} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-4">{consumer.firstName} {consumer.lastName}</td>
                    <td className="py-2 px-4">{consumer.email}</td>
                    <td className="py-2 px-4">{consumer.ageGroup}</td>
                    <td className="py-2 px-4">{new Date(consumer.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

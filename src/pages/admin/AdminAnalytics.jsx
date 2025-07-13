import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import AdminLayout from './AdminLayout';
import toast from 'react-hot-toast';

const { FiBarChart3, FiCalendar, FiDownload, FiRefreshCw, FiFilter } = FiIcons;

const AdminAnalytics = () => {
  const [loading, setLoading] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [timeRange, setTimeRange] = useState('7d');
  const [showCustomDatePicker, setShowCustomDatePicker] = useState(false);
  const [customDateRange, setCustomDateRange] = useState({
    startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0]
  });
  const [stats, setStats] = useState([]);
  const [chartData, setChartData] = useState([]);

  // Mock analytics data with more time ranges
  const mockAnalyticsData = {
    '1h': {
      stats: [
        { label: 'Total Sessions', value: '156', change: '+2.1%' },
        { label: 'Avg. Session Duration', value: '3m 45s', change: '+5.2%' },
        { label: 'Completion Rate', value: '92.3%', change: '+1.8%' },
        { label: 'New Participants', value: '12', change: '+8.3%' }
      ],
      chartData: [
        { date: new Date(Date.now() - 60 * 60 * 1000).toISOString(), sessions: 156, completions: 144 }
      ]
    },
    '6h': {
      stats: [
        { label: 'Total Sessions', value: '892', change: '+4.2%' },
        { label: 'Avg. Session Duration', value: '4m 12s', change: '+8.1%' },
        { label: 'Completion Rate', value: '89.7%', change: '+2.3%' },
        { label: 'New Participants', value: '67', change: '+12.4%' }
      ],
      chartData: Array.from({ length: 6 }, (_, i) => ({
        date: new Date(Date.now() - (5 - i) * 60 * 60 * 1000).toISOString(),
        sessions: 120 + Math.floor(Math.random() * 80),
        completions: 100 + Math.floor(Math.random() * 70)
      }))
    },
    '24h': {
      stats: [
        { label: 'Total Sessions', value: '2,156', change: '+6.8%' },
        { label: 'Avg. Session Duration', value: '4m 28s', change: '+10.5%' },
        { label: 'Completion Rate', value: '88.9%', change: '+2.8%' },
        { label: 'New Participants', value: '198', change: '+14.2%' }
      ],
      chartData: Array.from({ length: 24 }, (_, i) => ({
        date: new Date(Date.now() - (23 - i) * 60 * 60 * 1000).toISOString(),
        sessions: 80 + Math.floor(Math.random() * 60),
        completions: 70 + Math.floor(Math.random() * 50)
      }))
    },
    '7d': {
      stats: [
        { label: 'Total Sessions', value: '12,583', change: '+8.2%' },
        { label: 'Avg. Session Duration', value: '4m 23s', change: '+12.5%' },
        { label: 'Completion Rate', value: '87.2%', change: '+3.1%' },
        { label: 'New Participants', value: '1,298', change: '+15.3%' }
      ],
      chartData: Array.from({ length: 7 }, (_, i) => ({
        date: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        sessions: 1500 + Math.floor(Math.random() * 800),
        completions: 1200 + Math.floor(Math.random() * 600)
      }))
    },
    '30d': {
      stats: [
        { label: 'Total Sessions', value: '47,129', change: '+12.7%' },
        { label: 'Avg. Session Duration', value: '4m 12s', change: '+8.3%' },
        { label: 'Completion Rate', value: '85.9%', change: '+2.5%' },
        { label: 'New Participants', value: '4,782', change: '+11.2%' }
      ],
      chartData: Array.from({ length: 30 }, (_, i) => ({
        date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        sessions: 1400 + Math.floor(Math.random() * 1000),
        completions: 1100 + Math.floor(Math.random() * 800)
      }))
    },
    '90d': {
      stats: [
        { label: 'Total Sessions', value: '143,876', change: '+15.4%' },
        { label: 'Avg. Session Duration', value: '4m 05s', change: '+5.2%' },
        { label: 'Completion Rate', value: '84.3%', change: '+1.8%' },
        { label: 'New Participants', value: '12,947', change: '+9.5%' }
      ],
      chartData: Array.from({ length: 90 }, (_, i) => ({
        date: new Date(Date.now() - (89 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        sessions: 1300 + Math.floor(Math.random() * 1200),
        completions: 1000 + Math.floor(Math.random() * 900)
      }))
    },
    '1y': {
      stats: [
        { label: 'Total Sessions', value: '1,678,234', change: '+18.7%' },
        { label: 'Avg. Session Duration', value: '3m 58s', change: '+3.2%' },
        { label: 'Completion Rate', value: '83.1%', change: '+1.2%' },
        { label: 'New Participants', value: '156,789', change: '+22.4%' }
      ],
      chartData: Array.from({ length: 12 }, (_, i) => ({
        date: new Date(Date.now() - (11 - i) * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        sessions: 120000 + Math.floor(Math.random() * 60000),
        completions: 90000 + Math.floor(Math.random() * 50000)
      }))
    }
  };

  // Function to fetch analytics data based on time range
  const fetchAnalyticsData = async (range) => {
    if (range === 'custom') {
      // Generate custom data based on date range
      const startDate = new Date(customDateRange.startDate);
      const endDate = new Date(customDateRange.endDate);
      const daysDiff = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
      
      return {
        stats: [
          { label: 'Total Sessions', value: (daysDiff * 1800).toLocaleString(), change: '+10.2%' },
          { label: 'Avg. Session Duration', value: '4m 15s', change: '+7.8%' },
          { label: 'Completion Rate', value: '86.4%', change: '+2.1%' },
          { label: 'New Participants', value: (daysDiff * 180).toLocaleString(), change: '+13.5%' }
        ],
        chartData: Array.from({ length: Math.min(daysDiff, 90) }, (_, i) => ({
          date: new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          sessions: 1500 + Math.floor(Math.random() * 800),
          completions: 1200 + Math.floor(Math.random() * 600)
        }))
      };
    }
    
    return mockAnalyticsData[range] || mockAnalyticsData['7d'];
  };

  // Function to generate analytics report for export
  const generateAnalyticsReport = async (range) => {
    const data = await fetchAnalyticsData(range);
    let csv = 'date,sessions,completions,completion_rate\n';
    data.chartData.forEach(row => {
      const completionRate = ((row.completions / row.sessions) * 100).toFixed(1);
      csv += `${row.date},${row.sessions},${row.completions},${completionRate}%\n`;
    });
    return csv;
  };

  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      try {
        const data = await fetchAnalyticsData(timeRange);
        setStats(data.stats);
        setChartData(data.chartData);
      } catch (error) {
        console.error('Error loading analytics:', error);
        toast.error('Failed to load analytics data');
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, [timeRange, customDateRange]);

  const handleTimeRangeChange = async (range) => {
    if (range === 'custom') {
      setShowCustomDatePicker(true);
      return;
    }
    
    setTimeRange(range);
    setShowCustomDatePicker(false);
    setLoading(true);
    try {
      const analyticsData = await fetchAnalyticsData(range);
      setStats(analyticsData.stats);
      setChartData(analyticsData.chartData);
      toast.success(`Analytics updated for ${range} range`);
    } catch (error) {
      toast.error('Failed to update analytics');
      console.error('Error updating analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCustomDateApply = () => {
    setTimeRange('custom');
    setShowCustomDatePicker(false);
  };

  const handleExport = async () => {
    setExporting(true);
    try {
      const report = await generateAnalyticsReport(timeRange);
      const blob = new Blob([report], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `analytics-report-${timeRange}-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      toast.success('Report exported successfully');
    } catch (error) {
      toast.error('Failed to export report');
      console.error('Error exporting report:', error);
    } finally {
      setExporting(false);
    }
  };

  const timeRangeOptions = [
    { value: '1h', label: 'Last Hour' },
    { value: '6h', label: 'Last 6 Hours' },
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 90 Days' },
    { value: '1y', label: 'Last Year' },
    { value: 'custom', label: 'Custom Range' }
  ];

  return (
    <AdminLayout>
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Analytics Dashboard</h1>
          <p className="text-gray-600">
            Monitor platform performance and track key metrics
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            icon={<SafeIcon icon={FiDownload} />}
            onClick={handleExport}
            loading={exporting}
          >
            Export
          </Button>
          <Button
            variant="outline"
            size="sm"
            icon={<SafeIcon icon={FiFilter} />}
            onClick={() => {}}
          >
            Filter
          </Button>
        </div>
      </div>

      {/* Time Range Selector */}
      <Card className="mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="text-sm font-medium text-gray-700">Time Range:</div>
            <div className="flex flex-wrap gap-2">
              {timeRangeOptions.map(option => (
                <Button
                  key={option.value}
                  variant={timeRange === option.value ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => handleTimeRangeChange(option.value)}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              icon={<SafeIcon icon={FiRefreshCw} />}
              onClick={() => handleTimeRangeChange(timeRange)}
              loading={loading}
            >
              Refresh
            </Button>
          </div>
        </div>

        {/* Custom Date Range Picker */}
        {showCustomDatePicker && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 pt-4 border-t border-gray-200"
          >
            <div className="flex items-center space-x-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <input
                  type="date"
                  value={customDateRange.startDate}
                  onChange={(e) => setCustomDateRange({
                    ...customDateRange,
                    startDate: e.target.value
                  })}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                <input
                  type="date"
                  value={customDateRange.endDate}
                  onChange={(e) => setCustomDateRange({
                    ...customDateRange,
                    endDate: e.target.value
                  })}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <div className="pt-6">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleCustomDateApply}
                >
                  Apply
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="text-center">
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-gray-600 text-sm mb-2">{stat.label}</div>
              <div className={`text-sm font-medium ${
                stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Focus Group Sessions</h2>
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            <SafeIcon icon={FiBarChart3} className="w-8 h-8 text-gray-400" />
            <p className="ml-2 text-gray-600">Chart would render here with real data</p>
          </div>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Completion Rates</h2>
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            <SafeIcon icon={FiBarChart3} className="w-8 h-8 text-gray-400" />
            <p className="ml-2 text-gray-600">Chart would render here with real data</p>
          </div>
        </Card>
      </div>

      {/* Data Table */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Analytics Data</h2>
          <Button
            variant="outline"
            size="sm"
            onClick={handleExport}
          >
            Export CSV
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sessions
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Completions
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rate
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {chartData.slice(0, 10).map((row, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(row.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {row.sessions.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {row.completions.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {((row.completions / row.sessions) * 100).toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </AdminLayout>
  );
};

export default AdminAnalytics;
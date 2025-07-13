import React, { useState } from 'react'
import { motion } from 'framer-motion'
import SafeIcon from '../../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'

const { FiBarChart3, FiDownload, FiEye, FiCalendar, FiTrendingUp, FiUsers, FiDollarSign, FiClock } = FiIcons

const Reports = () => {
  const [timeRange, setTimeRange] = useState('30d')

  const reports = [
    {
      id: 1,
      title: 'Movie Trailer Feedback Analysis',
      focusGroup: 'Action Thriller Trailer',
      generatedAt: '2024-01-15',
      participants: 45,
      status: 'completed',
      insights: 92,
      sentiment: 'positive'
    },
    {
      id: 2,
      title: 'Mobile App UI Testing Report',
      focusGroup: 'TechStart App Design',
      generatedAt: '2024-01-12',
      participants: 25,
      status: 'completed',
      insights: 78,
      sentiment: 'mixed'
    },
    {
      id: 3,
      title: 'Book Cover Design Analysis',
      focusGroup: 'Romance Novel Cover Test',
      generatedAt: '2024-01-10',
      participants: 30,
      status: 'processing',
      insights: 0,
      sentiment: null
    }
  ]

  const stats = [
    {
      label: 'Total Reports',
      value: reports.length.toString(),
      icon: FiBarChart3,
      color: 'text-blue-600',
      bg: 'bg-blue-100'
    },
    {
      label: 'Avg. Participants',
      value: Math.round(reports.reduce((sum, r) => sum + r.participants, 0) / reports.length).toString(),
      icon: FiUsers,
      color: 'text-green-600',
      bg: 'bg-green-100'
    },
    {
      label: 'Total Insights',
      value: reports.reduce((sum, r) => sum + r.insights, 0).toString(),
      icon: FiTrendingUp,
      color: 'text-purple-600',
      bg: 'bg-purple-100'
    },
    {
      label: 'Avg. Completion',
      value: '2.5 days',
      icon: FiClock,
      color: 'text-orange-600',
      bg: 'bg-orange-100'
    }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'success'
      case 'processing': return 'warning'
      case 'failed': return 'danger'
      default: return 'default'
    }
  }

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'positive': return 'text-green-600'
      case 'negative': return 'text-red-600'
      case 'mixed': return 'text-yellow-600'
      default: return 'text-gray-600'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Reports & Analytics</h1>
              <p className="text-gray-600">View detailed insights and analytics from your focus groups.</p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-2">
              <select 
                value={timeRange} 
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
              <Button variant="outline" icon={<SafeIcon icon={FiDownload} />}>
                Export All
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="text-center">
                <div className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                  <SafeIcon icon={stat.icon} className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Reports List */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Recent Reports</h2>
            <Button variant="outline" size="sm">
              View All Reports
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Report
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Focus Group
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Participants
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sentiment
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Generated
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {reports.map((report) => (
                  <tr key={report.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{report.title}</div>
                        <div className="text-sm text-gray-500">{report.insights} insights generated</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {report.focusGroup}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {report.participants}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant={getStatusColor(report.status)}>
                        {report.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {report.sentiment ? (
                        <span className={`text-sm font-medium ${getSentimentColor(report.sentiment)}`}>
                          {report.sentiment}
                        </span>
                      ) : (
                        <span className="text-sm text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(report.generatedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          icon={<SafeIcon icon={FiEye} />}
                          disabled={report.status !== 'completed'}
                        >
                          View
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          icon={<SafeIcon icon={FiDownload} />}
                          disabled={report.status !== 'completed'}
                        >
                          Download
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Reports
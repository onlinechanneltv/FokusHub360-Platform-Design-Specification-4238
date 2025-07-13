import React, { useState } from 'react'
import { motion } from 'framer-motion'
import SafeIcon from '../../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'

const { FiUsers, FiSearch, FiFilter, FiStar, FiMapPin, FiClock, FiActivity } = FiIcons

const Participants = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [filter, setFilter] = useState('all')

  const participants = [
    {
      id: 1,
      name: 'Sarah Johnson',
      age: 28,
      location: 'New York, NY',
      rating: 4.9,
      completedGroups: 24,
      expertise: ['Technology', 'Mobile Apps', 'UX Design'],
      lastActive: '2 days ago',
      status: 'available',
      matchScore: 95
    },
    {
      id: 2,
      name: 'Michael Chen',
      age: 34,
      location: 'San Francisco, CA',
      rating: 4.8,
      completedGroups: 31,
      expertise: ['Entertainment', 'Movies', 'Streaming'],
      lastActive: '1 day ago',
      status: 'available',
      matchScore: 92
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      age: 26,
      location: 'Austin, TX',
      rating: 4.7,
      completedGroups: 18,
      expertise: ['Fashion', 'Beauty', 'Lifestyle'],
      lastActive: '3 hours ago',
      status: 'busy',
      matchScore: 88
    },
    {
      id: 4,
      name: 'David Kim',
      age: 31,
      location: 'Seattle, WA',
      rating: 4.9,
      completedGroups: 42,
      expertise: ['Gaming', 'Technology', 'Software'],
      lastActive: '5 hours ago',
      status: 'available',
      matchScore: 94
    }
  ]

  const filteredParticipants = participants.filter(participant => {
    const matchesSearch = participant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         participant.expertise.some(exp => exp.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesFilter = filter === 'all' || participant.status === filter
    return matchesSearch && matchesFilter
  })

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'success'
      case 'busy': return 'warning'
      case 'offline': return 'default'
      default: return 'default'
    }
  }

  const stats = [
    {
      label: 'Total Participants',
      value: participants.length.toString(),
      icon: FiUsers,
      color: 'text-blue-600',
      bg: 'bg-blue-100'
    },
    {
      label: 'Available Now',
      value: participants.filter(p => p.status === 'available').length.toString(),
      icon: FiActivity,
      color: 'text-green-600',
      bg: 'bg-green-100'
    },
    {
      label: 'Avg. Rating',
      value: (participants.reduce((sum, p) => sum + p.rating, 0) / participants.length).toFixed(1),
      icon: FiStar,
      color: 'text-yellow-600',
      bg: 'bg-yellow-100'
    },
    {
      label: 'Avg. Experience',
      value: Math.round(participants.reduce((sum, p) => sum + p.completedGroups, 0) / participants.length).toString(),
      icon: FiClock,
      color: 'text-purple-600',
      bg: 'bg-purple-100'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Participants</h1>
              <p className="text-gray-600">Browse and connect with verified participants for your focus groups.</p>
            </div>
            <div className="mt-4 md:mt-0">
              <Button variant="primary" icon={<SafeIcon icon={FiFilter} />}>
                Advanced Filters
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

        {/* Filters */}
        <Card className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="relative w-full md:w-64">
              <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search participants..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2">
              {['all', 'available', 'busy'].map(status => (
                <Button
                  key={status}
                  variant="outline"
                  size="sm"
                  onClick={() => setFilter(status)}
                  className={filter === status ? 'bg-primary-50 text-primary-600 border-primary-300' : ''}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </Button>
              ))}
            </div>
          </div>
        </Card>

        {/* Participants Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredParticipants.map((participant, index) => (
            <motion.div
              key={participant.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card hover className="h-full">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-semibold">
                      {participant.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{participant.name}</h3>
                      <p className="text-sm text-gray-600">Age {participant.age}</p>
                    </div>
                  </div>
                  <Badge variant={getStatusColor(participant.status)} size="sm">
                    {participant.status}
                  </Badge>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <SafeIcon icon={FiMapPin} className="w-4 h-4 mr-2" />
                    {participant.location}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <SafeIcon icon={FiStar} className="w-4 h-4 text-yellow-400 mr-1" />
                      <span className="text-sm font-medium">{participant.rating}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      {participant.completedGroups} groups completed
                    </div>
                  </div>

                  <div className="flex items-center text-sm text-gray-600">
                    <SafeIcon icon={FiClock} className="w-4 h-4 mr-2" />
                    Last active {participant.lastActive}
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Expertise</h4>
                  <div className="flex flex-wrap gap-1">
                    {participant.expertise.map((skill, i) => (
                      <Badge key={i} variant="default" size="sm">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <span className="text-gray-600">Match Score: </span>
                    <span className="font-medium text-green-600">{participant.matchScore}%</span>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      View Profile
                    </Button>
                    <Button 
                      variant="primary" 
                      size="sm"
                      disabled={participant.status === 'busy'}
                    >
                      Invite
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredParticipants.length === 0 && (
          <Card className="text-center py-12">
            <SafeIcon icon={FiUsers} className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No participants found</h3>
            <p className="text-gray-600">
              Try adjusting your search or filters to find participants.
            </p>
          </Card>
        )}
      </div>
    </div>
  )
}

export default Participants
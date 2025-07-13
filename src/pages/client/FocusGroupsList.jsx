import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import SafeIcon from '../../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import useFocusGroupStore from '../../store/focusGroupStore'

const { FiPlus, FiUsers, FiBarChart3, FiClock, FiPlay, FiEye, FiEdit2, FiTrash2, FiSearch, FiFilter } = FiIcons

const FocusGroupsList = () => {
  const { focusGroups, loadFocusGroups, deleteFocusGroup, loading } = useFocusGroupStore()
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  useEffect(() => {
    loadFocusGroups()
  }, [loadFocusGroups])

  const filteredGroups = focusGroups.filter(group => {
    const matchesSearch = group.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         group.description?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || group.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'success'
      case 'completed': return 'primary'
      case 'draft': return 'warning'
      case 'paused': return 'danger'
      default: return 'default'
    }
  }

  const handleDelete = async (groupId) => {
    if (window.confirm('Are you sure you want to delete this focus group?')) {
      try {
        await deleteFocusGroup(groupId)
      } catch (error) {
        console.error('Error deleting focus group:', error)
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Focus Groups</h1>
              <p className="text-gray-600">Manage your focus group campaigns and track their performance.</p>
            </div>
            <div className="mt-4 md:mt-0">
              <Button 
                variant="primary" 
                size="lg" 
                icon={<SafeIcon icon={FiPlus} />}
                onClick={() => navigate('/client/create-group')}
              >
                Create Focus Group
              </Button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="relative w-full md:w-64">
              <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search focus groups..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2">
              {['all', 'active', 'completed', 'draft', 'paused'].map(status => (
                <Button
                  key={status}
                  variant="outline"
                  size="sm"
                  onClick={() => setStatusFilter(status)}
                  className={statusFilter === status ? 'bg-primary-50 text-primary-600 border-primary-300' : ''}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </Button>
              ))}
            </div>
          </div>
        </Card>

        {/* Focus Groups Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <Card key={i} className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-full mb-4"></div>
                <div className="h-8 bg-gray-200 rounded"></div>
              </Card>
            ))}
          </div>
        ) : filteredGroups.length === 0 ? (
          <Card className="text-center py-12">
            <SafeIcon icon={FiPlay} className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No focus groups found</h3>
            <p className="text-gray-600 mb-4">
              {searchQuery || statusFilter !== 'all' 
                ? 'Try adjusting your search or filters.' 
                : 'Get started by creating your first focus group.'
              }
            </p>
            {!searchQuery && statusFilter === 'all' && (
              <Button 
                variant="primary" 
                icon={<SafeIcon icon={FiPlus} />}
                onClick={() => navigate('/client/create-group')}
              >
                Create Focus Group
              </Button>
            )}
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGroups.map((group, index) => (
              <motion.div
                key={group.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card hover className="h-full">
                  <div className="mb-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                        {group.title}
                      </h3>
                      <Badge variant={getStatusColor(group.status)} size="sm">
                        {group.status}
                      </Badge>
                    </div>
                    <p className="text-gray-600 text-sm line-clamp-3 mb-3">
                      {group.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-primary-600">
                        {group.current_participants || 0}/{group.target_participants || 0}
                      </div>
                      <div className="text-xs text-gray-500">Participants</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-600">
                        ${group.reward_amount || 50}
                      </div>
                      <div className="text-xs text-gray-500">Reward</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <span className="flex items-center">
                      <SafeIcon icon={FiClock} className="w-3 h-3 mr-1" />
                      {new Date(group.created_at).toLocaleDateString()}
                    </span>
                    <span className="flex items-center">
                      <SafeIcon icon={FiBarChart3} className="w-3 h-3 mr-1" />
                      {group.content_type}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex space-x-1">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        icon={<SafeIcon icon={FiEye} />}
                        onClick={() => navigate(`/focus-groups/${group.id}`)}
                        title="View Details"
                      />
                      <Button 
                        variant="outline" 
                        size="sm" 
                        icon={<SafeIcon icon={FiEdit2} />}
                        onClick={() => navigate(`/focus-groups/${group.id}/edit`)}
                        title="Edit"
                      />
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      icon={<SafeIcon icon={FiTrash2} />}
                      className="text-red-600 hover:bg-red-50"
                      onClick={() => handleDelete(group.id)}
                      title="Delete"
                    />
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default FocusGroupsList
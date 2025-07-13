import React, { useState } from 'react'
import { motion } from 'framer-motion'
import SafeIcon from '../../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'

const { FiMessageSquare, FiSearch, FiSend, FiPaperclip, FiMoreVertical, FiCheck, FiCheckCheck } = FiIcons

const Messages = () => {
  const [selectedConversation, setSelectedConversation] = useState(null)
  const [newMessage, setNewMessage] = useState('')

  const conversations = [
    {
      id: 1,
      name: 'Support Team',
      lastMessage: 'Your focus group campaign has been approved and is now live!',
      timestamp: '2 hours ago',
      unread: 2,
      type: 'support',
      avatar: 'S'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      lastMessage: 'Thank you for the opportunity to participate in your focus group.',
      timestamp: '1 day ago',
      unread: 0,
      type: 'participant',
      avatar: 'SJ'
    },
    {
      id: 3,
      name: 'Account Manager',
      lastMessage: 'I wanted to follow up on your recent campaign performance...',
      timestamp: '2 days ago',
      unread: 1,
      type: 'manager',
      avatar: 'AM'
    },
    {
      id: 4,
      name: 'Michael Chen',
      lastMessage: 'I have some additional feedback about the trailer that might be helpful.',
      timestamp: '3 days ago',
      unread: 0,
      type: 'participant',
      avatar: 'MC'
    }
  ]

  const getConversationColor = (type) => {
    switch (type) {
      case 'support': return 'from-blue-500 to-blue-600'
      case 'manager': return 'from-green-500 to-green-600'
      case 'participant': return 'from-purple-500 to-purple-600'
      default: return 'from-gray-500 to-gray-600'
    }
  }

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Handle sending message
      setNewMessage('')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Messages</h1>
          <p className="text-gray-600">Communicate with participants, support team, and account managers.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Conversations List */}
          <div className="lg:col-span-1">
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Conversations</h2>
                <Button variant="primary" size="sm" icon={<SafeIcon icon={FiMessageSquare} />}>
                  New
                </Button>
              </div>
              
              <div className="relative mb-4">
                <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              <div className="space-y-2">
                {conversations.map((conversation) => (
                  <motion.div
                    key={conversation.id}
                    whileHover={{ scale: 1.02 }}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedConversation?.id === conversation.id 
                        ? 'bg-primary-50 border border-primary-200' 
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedConversation(conversation)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`w-10 h-10 bg-gradient-to-br ${getConversationColor(conversation.type)} rounded-full flex items-center justify-center text-white font-medium text-sm`}>
                        {conversation.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-medium text-gray-900 truncate">
                            {conversation.name}
                          </h3>
                          {conversation.unread > 0 && (
                            <Badge variant="primary" size="sm">
                              {conversation.unread}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 truncate mt-1">
                          {conversation.lastMessage}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {conversation.timestamp}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </div>

          {/* Message Thread */}
          <div className="lg:col-span-2">
            {selectedConversation ? (
              <Card className="h-[600px] flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 bg-gradient-to-br ${getConversationColor(selectedConversation.type)} rounded-full flex items-center justify-center text-white font-medium`}>
                      {selectedConversation.avatar}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{selectedConversation.name}</h3>
                      <p className="text-sm text-gray-600 capitalize">{selectedConversation.type}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" icon={<SafeIcon icon={FiMoreVertical} />} />
                </div>

                {/* Messages */}
                <div className="flex-1 p-4 overflow-y-auto">
                  <div className="space-y-4">
                    {/* Sample messages */}
                    <div className="flex justify-start">
                      <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
                        <p className="text-sm text-gray-900">
                          {selectedConversation.lastMessage}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">{selectedConversation.timestamp}</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <div className="bg-primary-600 text-white rounded-lg p-3 max-w-xs">
                        <p className="text-sm">
                          Thank you for reaching out. I'll look into this right away.
                        </p>
                        <div className="flex items-center justify-end mt-1">
                          <SafeIcon icon={FiCheckCheck} className="w-3 h-3 text-primary-200" />
                          <span className="text-xs text-primary-200 ml-1">1 hour ago</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-gray-200">
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" icon={<SafeIcon icon={FiPaperclip} />} />
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      />
                    </div>
                    <Button 
                      variant="primary" 
                      size="sm" 
                      icon={<SafeIcon icon={FiSend} />}
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                    />
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="h-[600px] flex items-center justify-center">
                <div className="text-center">
                  <SafeIcon icon={FiMessageSquare} className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
                  <p className="text-gray-600">Choose a conversation from the list to start messaging.</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Messages
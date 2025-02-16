import React from 'react'
import { Bot, History, Settings, Moon, Sun } from '../icons/Icons'
import UserProfile from '../userprofile/UserProfile'
import RecentActivity from '../sidebar/RecentActivity'

const Sidebar: React.FC = () => {
  const [darkMode, setDarkMode] = React.useState(false)

  React.useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
  }, [darkMode])

  return (
    <div className="w-64 border-r border-blue-200/30 dark:border-blue-300/30 p-4 flex flex-col gap-4 bg-white/30 dark:bg-gray-800/30 backdrop-blur-md min-h-screen relative">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Bot className="h-6 w-6 text-blue-500/80" />
          <h1 className="font-semibold text-gray-800/90 dark:text-white/90">README Wizard</h1>
        </div>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full hover:bg-gray-200/30 dark:hover:bg-gray-700/30 transition-colors"
        >
          {darkMode ? (
            <Sun className="h-4 w-4 text-yellow-500/80" />
          ) : (
            <Moon className="h-4 w-4 text-gray-500/80" />
          )}
        </button>
      </div>

      {/* User Profile with Glass Effect */}
      <div className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-md rounded-xl p-3 border border-white/20 dark:border-gray-700/50">
        <UserProfile />
      </div>

      {/* Recent Activity Section */}
      <div className="flex-1 space-y-4">
        <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-200/30 dark:hover:bg-gray-700/30 w-full transition-colors">
          <History className="h-4 w-4 text-gray-600/80 dark:text-gray-300/80" />
          <span className="text-gray-700/90 dark:text-gray-300/90">History</span>
        </button>
        
        <div className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-md rounded-xl border border-white/20 dark:border-gray-700/50 p-3 h-[calc(100vh-380px)] overflow-y-auto">
          <h3 className="text-sm font-medium mb-2 text-gray-600/90 dark:text-gray-400/90">
            Recent Activity
          </h3>
          <RecentActivity />
        </div>
      </div>

      {/* Fixed Settings at Bottom */}
      <div className="sticky bottom-0 bg-white/30 dark:bg-gray-800/30 backdrop-blur-md border-t border-white/20 dark:border-gray-700/50 -mx-4 px-4 py-3">
        <button className="flex items-center gap-2 w-full px-3 py-2 rounded-lg hover:bg-gray-200/30 dark:hover:bg-gray-700/30 transition-colors">
          <Settings className="h-4 w-4 text-gray-600/80 dark:text-gray-300/80" />
          <span className="text-gray-700/90 dark:text-gray-300/90">Settings</span>
        </button>
      </div>
    </div>
  )
}

export default Sidebar
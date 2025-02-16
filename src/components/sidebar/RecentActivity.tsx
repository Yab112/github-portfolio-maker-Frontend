import React from 'react'

const RecentActivity: React.FC = () => {
  const recentActivity = [
    { type: "generate", project: "next-auth-example", time: "2 hours ago" },
    { type: "modify", project: "portfolio-readme", time: "5 hours ago" },
    { type: "generate", project: "react-dashboard", time: "1 day ago" },
  ]

  return (
    <div className="space-y-2 overflow-y-auto">
      <h2 className="text-sm font-medium text-gray-700 dark:text-gray-300 px-2">Recent Activity</h2>
      {recentActivity.map((activity, i) => (
        <div key={i} className="p-2 text-sm rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer">
          <div className="font-medium text-gray-800 dark:text-white">{activity.project}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</div>
        </div>
      ))}
    </div>
  )
}

export default RecentActivity

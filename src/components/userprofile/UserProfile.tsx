import React from 'react'

const UserProfile: React.FC = () => {
  const user = {
    name: "John Doe",
    username: "johndoe",
    avatar: "https://github.com/ghost.png",
  }

  return (
    <div className="flex items-center gap-3 mb-4">
      <img src={user.avatar || "/placeholder.svg"} alt={user.name} className="w-10 h-10 rounded-full" />
      <div>
        <h2 className="font-semibold text-gray-800 dark:text-white">{user.name}</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">@{user.username}</p>
      </div>
    </div>
  )
}

export default UserProfile

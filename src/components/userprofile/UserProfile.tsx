import React from 'react'
import { useAuth } from '../../hooks/useAuth'

const UserProfile: React.FC = () => {
  const {user} = useAuth()
  console.log("DEBUG:the user is here we go ",user)
   
  return (
    user && <div className="flex items-center gap-3 mb-4">
      <img src={user?.profilePic || "/placeholder.svg"} alt={user.Githubusername} className="w-10 h-10 rounded-full" />
      <div className='flex flex-col gap-2'>
      <h2 className="font-semibold text-gray-800 dark:text-white">{user?.Githubusername}</h2>
        <p className="text-[12px] text-gray-500 dark:text-white p-2 rounded-2xl bg-blue-500 ">{user?.email}</p>
      </div>
    </div>
  )
}

export default UserProfile

import React from 'react'
import Profile from './userprofile/UserProfile'

const protectedHeader = () => {
  return (
    <div className='flex justify-between bg-blue-600 items-center'>
        <img src="/log_in_back.ipg" alt="" />
        <Profile/>
    </div>
  )
}

export default protectedHeader
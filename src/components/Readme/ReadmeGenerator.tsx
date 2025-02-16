import React, { useState } from 'react'
import { FileCode, User } from '../icons/Icons'
import ProjectReadme from './ProjectReadme'
import ProfileReadme from './ProfileReadme'
import AiChat from '../ai/AiChat'
import ReadmePreview from './ReadmePreview'

const ReadmeGenerator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'project' | 'profile' | 'ai'>('project')
  const [generatedReadme, setGeneratedReadme] = useState('')

  const renderTabContent = () => {
    switch (activeTab) {
      case 'project':
        return <ProjectReadme setGeneratedReadme={setGeneratedReadme} />
      case 'profile':
        return <ProfileReadme setGeneratedReadme={setGeneratedReadme} />
      case 'ai':
        return <AiChat />
      default:
        return null
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === 'project'
              ? 'text-blue-500 border-b-2 border-blue-500'
              : 'text-gray-500 dark:text-gray-400'
          }`}
          onClick={() => setActiveTab('project')}
        >
          <div className="flex items-center gap-2 cursor-pointe">
            <FileCode className="w-4 h-4" />
            Project README
          </div>
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === 'profile'
              ? 'text-blue-500 border-b-2 border-blue-500'
              : 'text-gray-500 dark:text-gray-400'
          }`}
          onClick={() => setActiveTab('profile')}
        >
          <div className="flex items-center gap-2 cursor-pointe">
            <User className="w-4 h-4" />
            GitHub Profile
          </div>
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === 'ai'
              ? 'text-blue-500 border-b-2 border-blue-500'
              : 'text-gray-500 dark:text-gray-400'
          }`}
          onClick={() => setActiveTab('ai')}
        >
          <div className="flex items-center gap-2 cursor-pointe">
            <FileCode className="w-4 h-4" />
            Modify With AI
          </div>
        </button>
      </div>

      {renderTabContent()}
      
      {activeTab !== "ai" ? generatedReadme && <ReadmePreview readme={generatedReadme} />: ""}
    </div>
  )
}

export default ReadmeGenerator
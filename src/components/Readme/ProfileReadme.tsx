"use client"

import type React from "react"
import { useState } from "react"
import {profileTemplates} from "../../../data/profileTemplates"

interface ProfileReadmeProps {
  setGeneratedReadme: (readme: string) => void
}

const ProfileReadme: React.FC<ProfileReadmeProps> = ({ setGeneratedReadme }) => {
  const [selectedTemplate, setSelectedTemplate] = useState("minimal")

  const handleGenerateProfileReadme = () => {
    const template = profileTemplates.find((t) => t.id === selectedTemplate)
    if (template) {
      setGeneratedReadme(template.preview)
    }
  }

  return (
    <div className="bg-white dark:bg-transparent rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Generate Profile README</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-4">Choose a template and generate your GitHub profile README</p>

      <div className="grid grid-cols-3 gap-4 mb-4">
        {profileTemplates.map((template) => (
          <label
            key={template.id}
            className={`flex flex-col items-center justify-between rounded-md border-2 p-4 cursor-pointer ${
              selectedTemplate === template.id
                ? "border-blue-500 bg-blue-50 dark:bg-blue-900"
                : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
            }`}
          >
            <input
              type="radio"
              name="profileTemplate"
              value={template.id}
              checked={selectedTemplate === template.id}
              onChange={() => setSelectedTemplate(template.id)}
              className="sr-only"
            />
            <span className="text-sm font-medium text-gray-900 dark:text-white mb-2">{template.name}</span>
            <span className="text-xs text-gray-500 dark:text-gray-400 text-center">
              {template.preview.slice(0, 50)}...
            </span>
          </label>
        ))}
      </div>

      <button
        onClick={handleGenerateProfileReadme}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
      >
        Generate Profile README
      </button>
    </div>
  )
}

export default ProfileReadme


import React, { useEffect, useRef, useState } from 'react'
import { Copy, Download } from 'react-feather' // Importing icons

interface ReadmePreviewProps {
  readme: string
}

const ReadmePreview: React.FC<ReadmePreviewProps> = ({ readme }) => {
  const previewRef = useRef<HTMLDivElement>(null)
  const [copied, setCopied] = useState(false)
  const [animatedReadme, setAnimatedReadme] = useState('')

  useEffect(() => {
    if (previewRef.current) {
      previewRef.current.scrollTop = previewRef.current.scrollHeight
    }
  }, [animatedReadme])

  // Simulate AI typing effect
  useEffect(() => {
    if (readme) {
      let index = 0
      const interval = setInterval(() => {
        setAnimatedReadme(readme.slice(0, index))
        index++
        if (index > readme.length) clearInterval(interval)
      }, 20) // Typing speed
      return () => clearInterval(interval)
    }
  }, [readme])

  // Copy to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(readme)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Download as JSON file
  const handleDownload = () => {
    const blob = new Blob([JSON.stringify({ readme }, null, 2)], { type: 'application/json' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'readme.json'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="mt-8 border border-blue-900 rounded-lg shadow-md p-4 w-full 
        backdrop-blur-md bg-white/20 dark:bg-gray-800/30 transition-all"
    >
      {/* Header Section */}
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Generated README Preview</h3>
        <div className="flex gap-3">
          {/* Copy Button */}
          <button 
            onClick={handleCopy} 
            className="p-2 bg-white/50 dark:bg-gray-700/50 rounded-lg shadow-md 
            hover:bg-white/80 dark:hover:bg-gray-600/80 transition-all"
          >
            <Copy className="w-5 h-5 text-gray-800 dark:text-gray-300" />
          </button>

          {/* Download Button */}
          <button 
            onClick={handleDownload} 
            className="p-2 bg-white/50 dark:bg-gray-700/50 rounded-lg shadow-md 
            hover:bg-white/80 dark:hover:bg-gray-600/80 transition-all"
          >
            <Download className="w-5 h-5 text-gray-800 dark:text-gray-300" />
          </button>
        </div>
      </div>

      {/* Auto-scroll container with glass effect */}
      <div 
        ref={previewRef} 
        className="bg-gray-100/30 dark:bg-gray-900/30 border border-blue-400/40 
        p-4 rounded-md max-h-[400px] overflow-auto custom-scrollbar"
      >
        <pre className="whitespace-pre-wrap text-sm text-blue-800 dark:text-gray-200">
          {animatedReadme}
        </pre>
      </div>

      {/* Copy Confirmation */}
      {copied && (
        <p className="text-center text-green-500 text-sm mt-2">Copied to clipboard!</p>
      )}
    </div>
  )
}

export default ReadmePreview

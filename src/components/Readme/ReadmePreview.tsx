import React, { useEffect, useRef, useState } from 'react'
import { Copy, Download } from 'react-feather'

interface ReadmePreviewProps {
  readme: string
}

const ReadmePreview: React.FC<ReadmePreviewProps> = ({ readme }) => {
  const previewRef = useRef<HTMLDivElement>(null)
  const [copied, setCopied] = useState(false)
  const [animatedReadme, setAnimatedReadme] = useState('')

  // Typing effect
  useEffect(() => {
    if (readme) {
      let index = 0
      const interval = setInterval(() => {
        setAnimatedReadme(prev => prev + readme[index])
        index++
        if (index >= readme.length) clearInterval(interval)
      }, 8)
      return () => clearInterval(interval)
    }
  }, [readme])

  // UI enhancements
  useEffect(() => {
    if (previewRef.current) {
      previewRef.current.scrollTop = previewRef.current.scrollHeight
    }
  }, [animatedReadme])

  const handleCopy = () => {
    navigator.clipboard.writeText(readme)
    setCopied(true)
    setTimeout(() => setCopied(false), 1200)
  }

  const handleDownload = () => {
    const blob = new Blob([readme], { type: 'text/markdown' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'SYNTH_README.md'
    link.click()
  }

  return (
    <div className="mt-8 border-2 border-cyan-400/10 rounded-lg p-4 w-full 
        backdrop-blur-lg bg-gray-900/80 shadow-cyan-400/30 hover:shadow-cyan-400/40 
        transition-all duration-300">
      
      {/* Header with HUD-style elements */}
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-xl font-mono font-bold text-cyan-400 glow-cyan">
          [SYSTEM_READOUT]::README.md
        </h3>
        <div className="flex gap-2">
          <button 
            onClick={handleCopy} 
            className="px-3 py-2 bg-gray-800/60 border border-cyan-400/40 rounded-md 
            hover:bg-cyan-400/10 hover:border-cyan-400/80 hover:shadow-cyan-400 
            transition-all duration-200"
          >
            <Copy className="w-5 h-5 text-cyan-300/80 hover:text-cyan-200" />
          </button>
          <button 
            onClick={handleDownload}
            className="px-3 py-2 bg-gray-800/60 border border-cyan-400/40 rounded-md 
            hover:bg-cyan-400/10 hover:border-cyan-400/80 hover:shadow-cyan-400 
            transition-all duration-200"
          >
            <Download className="w-5 h-5 text-cyan-300/80 hover:text-cyan-200" />
          </button>
        </div>
      </div>

      {/* Terminal-style display */}
      <div 
        ref={previewRef} 
        className="bg-gray-950/90 border border-cyan-400/20 p-4 rounded-md 
        max-h-[400px] overflow-auto terminal-scrollbar font-mono text-sm"
      >
        <pre className="whitespace-pre-wrap text-green-400/90">
          {animatedReadme}
          <span className="ml-1 inline-block w-2 h-4 bg-green-400/80 animate-pulse"></span>
        </pre>
      </div>

      {/* Status indicator */}
      {copied && (
        <div className="mt-2 text-center">
          <span className="text-cyan-400/90 text-sm font-mono animate-pulse">
            [STATUS]::COPIED_TO_CLIPBOARD
          </span>
        </div>
      )}
    </div>
  )
}

export default ReadmePreview
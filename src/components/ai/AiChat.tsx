'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Send, Edit2, Copy } from 'react-feather';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const AiChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      if (editingIndex !== null) {
        const updatedMessages = [...messages];
        updatedMessages[editingIndex] = { role: 'user', content: input };
        setMessages(updatedMessages);
        setEditingIndex(null);
      } else {
        setMessages([...messages, { role: 'user', content: input }]);
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            { role: 'assistant', content: `Echo: ${input}` },
          ]);
        }, 500);
      }
      setInput('');
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="bg-white/30 dark:bg-transparent rounded-xl p-8 backdrop-blur-md border border-white/20 dark:border-gray-700/50 shadow-xl w-full max-w-4xl mx-auto">
      <div className="relative h-[700px] flex flex-col">
        {/* Chat Display Container */}
        <div
          ref={chatContainerRef}
          className="flex-1 space-y-4 mb-4 overflow-y-auto pr-2 custom-scrollbar"
        >
          {messages.map((message, i) => (
            <div
              key={i}
              className={`flex ${message.role === 'assistant' ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={`relative rounded-xl p-4 max-w-[85%] text-sm shadow-lg group transition-all backdrop-blur-md ${
                  message.role === 'assistant'
                    ? 'bg-gray-100/30 dark:bg-gray-700/30 text-gray-800 dark:text-gray-200 border border-white/20 dark:border-gray-700/50'
                    : 'bg-blue-500/30 text-blue-800 dark:text-blue-200 border border-blue-300/20 dark:border-blue-600/30'
                }`}
              >
                <div className="space-y-2">
                  <div className="font-medium text-xs opacity-70">
                    {message.role === 'assistant' ? 'AI Assistant' : 'You'}
                  </div>
                  <div className="leading-relaxed">{message.content}</div>
                </div>

                {/* Edit & Copy Buttons */}
                {message.role === 'user' && (
                  <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      className="bg-white/70 dark:bg-gray-800/70 p-1.5 rounded-full shadow-sm hover:bg-white/90 dark:hover:bg-gray-700/90 transition-all"
                      onClick={() => {
                        setInput(message.content);
                        setEditingIndex(i);
                      }}
                    >
                      <Edit2 className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                    </button>
                  </div>
                )}

                {message.role === 'assistant' && (
                  <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      className="bg-white/70 dark:bg-gray-800/70 p-1.5 rounded-full shadow-sm hover:bg-white/90 dark:hover:bg-gray-700/90 transition-all"
                      onClick={() => handleCopy(message.content)}
                    >
                      <Copy className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Input Box */}
        <form onSubmit={handleSubmit} className="w-full">
          <div className="flex items-center gap-2 bg-white/30 dark:bg-gray-700/30 backdrop-blur-md border border-white/20 dark:border-gray-700/50 rounded-xl px-12 py-6 shadow-sm">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask AI to help with your README..."
              className="flex-1 bg-transparent text-gray-800 dark:text-gray-200 placeholder-gray-500/80 dark:placeholder-gray-400/80 focus:outline-none px-2 py-1"
            />
            <button
              type="submit"
              className="p-2 bg-blue-500/30 hover:bg-blue-600/30 text-blue-600 dark:text-blue-400 rounded-lg transition-all border border-white/20 dark:border-gray-700/50"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <p className="text-center text-xs mt-2 text-gray-500/80 dark:text-gray-400/80">
            AI can make mistakes. Verify important information.
          </p>
        </form>
      </div>
    </div>
  );
};

export default AiChat;

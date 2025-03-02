import React, { useState } from "react";

interface RepoDropdownProps {
  repositories: string[]; 
  selectedRepo: string;
  onSelect: (repo: string) => void;
}

const RepoDropdown: React.FC<RepoDropdownProps> = ({ 
  repositories, 
  onSelect, 
  selectedRepo 
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRepos = repositories.filter(repo =>
    repo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative w-96">
      <div className="backdrop-blur-lg bg-white/30 dark:bg-transparent rounded-lg shadow-lg border border-white/20 dark:border-blue-700/50">
        {/* Search Input */}
        <div className="p-4 border-b border-white/20 dark:border-gray-700/50">  
          <input
            type="text"
            placeholder="Search repositories..."
            className="w-full px-3 py-2 bg-transparent text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Repository List with Scroll Effect */}
        <div className="max-h-48 overflow-y-auto">
          {filteredRepos.map((repo, index) => (
            <button
              key={index} // Use index as key since repo names might not be unique
              className={`w-full px-4 py-3 hover:bg-white/20 dark:hover:bg-blue-400/80 transition-colors ${
                selectedRepo === repo ? "bg-blue-100/20 dark:bg-blue-800/30" : ""
              }`}
              onClick={() => onSelect(repo)}
            >
              <div className="flex justify-between items-center">
                <span className="text-gray-800 dark:text-gray-200">{repo}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RepoDropdown;
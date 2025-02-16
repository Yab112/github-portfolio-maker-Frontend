import React, { useState } from "react";

interface Repository {
  name: string;
  updated: string;
  stars: number;
}

interface RepoDropdownProps {
  repositories: Repository[];
  selectedRepo: string;
  onSelect: (repo: string) => void;
}

const RepoDropdown: React.FC<RepoDropdownProps> = ({ repositories, onSelect }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRepos = repositories.filter((repo) =>
    repo.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative w-96">
      <div className="backdrop-blur-lg bg-white/30 dark:bg-transparent rounded-lg shadow-lg border border-white/20 dark:border-gray-700/50">
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
          {filteredRepos.map((repo) => (
            <button
              key={repo.name}
              className="w-full px-4 py-3 hover:bg-white/20 dark:hover:bg-gray-700/30 transition-colors"
              onClick={() => onSelect(repo.name)}
            >
              <div className="flex justify-between items-center">
                <span className="text-gray-800 dark:text-gray-200">{repo.name}</span>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600 dark:text-gray-400">⭐ {repo.stars}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">Updated {repo.updated}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RepoDropdown;

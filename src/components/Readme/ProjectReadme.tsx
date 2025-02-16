import React, { useState } from 'react';
import RepoDropdown from './RepoDropdown';
import PastePathInput from './PastePathInput';

interface ProjectReadmeProps {
  setGeneratedReadme: (readme: string) => void;
}

const ProjectReadme: React.FC<ProjectReadmeProps> = ({
  setGeneratedReadme,
}) => {
  const [selectedRepo, setSelectedRepo] = useState('');
  const [repos] = useState([
    { name: 'next-auth-example', updated: '2 days ago', stars: 45 },
    { name: 'portfolio-site', updated: '5 days ago', stars: 12 },
    { name: 'react-dashboard', updated: '1 week ago', stars: 78 },
    { name: 'next-auth-example', updated: '2 days ago', stars: 45 },
    { name: 'portfolio-site', updated: '5 days ago', stars: 12 },
    { name: 'react-dashboard', updated: '1 week ago', stars: 78 },
  ]);

  const handleGenerateReadme = () => {
    const readmeContent = selectedRepo
      ? `# ${selectedRepo}\n\n...` // Generation logic
      : 'Please select a repository or provide a package.json path';
    setGeneratedReadme(readmeContent);
  };

  const handlePathSubmit = (path: string) => {
    const repoName = path.split('/').slice(-2, -1)[0];
    setSelectedRepo(repoName);
  };

  return (
    <div className="bg-white/30 dark:bg-transparent rounded-lg shadow-xl p-6 backdrop-blur-md border border-white/20 dark:border-gray-700/50">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
        Generate Project README
      </h2>

      <div className="flex space-x-6">
        {/* Repo Selection Section */}
        <div className="w-96">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
            Select Repository
          </h3>
          <RepoDropdown
            repositories={repos}
            selectedRepo={selectedRepo}
            onSelect={setSelectedRepo}
          />
        </div>

        {/* Paste Path Section */}
        <div className="flex-1 flex flex-col">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
            Or Paste `package.json` Path
          </h3>
          <PastePathInput onPathSubmit={handlePathSubmit} />
          <button
            onClick={handleGenerateReadme}
            className="mt-6 w-full py-3 px-6 bg-blue-400/80 hover:bg-blue-600/30 text-white dark:text-white rounded-lg shadow-md transition-all duration-300 font-semibold"
          > 
            Generate README
          </button>
        </div>
      </div>

      {/* Generate README Button */}
    </div>
  );
};

export default ProjectReadme;

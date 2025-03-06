import React, { useEffect, useState } from 'react';
import RepoDropdown from './RepoDropdown';
import PastePathInput from './PastePathInput';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import GithubLoader from '../GithubLoader';
import { promptdata } from '../../../data/prompt';
import { prepareProjectData } from '../../../utils/prepareProjectData ';
import { getMe, updateUserProfile } from '../../service/api';

interface ProjectReadmeProps {
  setGeneratedReadme: (readme: string) => void;
}

const ProjectReadme: React.FC<ProjectReadmeProps> = ({
  setGeneratedReadme,
}) => {
  const { getrepos, fetchRepoFiles, fetchAllRepoFiles, GetHCatResponseApi } =
    useAuth();

  const [selectedRepo, setSelectedRepo] = useState('');
  const [repos, setrepos] = useState<string[]>([]);
  const [Loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const repositories = await getrepos();
        setrepos(repositories);
      } catch (error) {
        toast(`${error}`);
      }
    };

    fetchRepos();
  }, [getrepos]);

  const handlegetrepoContents = async () => {
    setLoading(true);
    try {
      const response = await fetchRepoFiles(selectedRepo);
      if (!response || Object.keys(response).length === 0) {
        throw new Error('No files found in the repository.');
      }

      const fileContents = await fetchAllRepoFiles(response);
      if (!fileContents || Object.keys(fileContents).length === 0) {
        throw new Error('Error fetching file contents.');
      }

      toast('Data successfully fetched. Generating README...');
      const formattedFiles = Object.entries(fileContents)
        .map(
          ([filename, content]) =>
            `### ${filename}\n\`\`\`\n${content.slice(0, 1000)}...\n\`\`\`` // Truncates to 1000 characters
        )
        .join('\n\n');

      const finalPrompt = `
        ${promptdata}

        ## Project Files:
        ${formattedFiles}
      `;

      console.log('DEBUG:the finalPrompt looks like', finalPrompt);

      const chatresponse = await GetHCatResponseApi(finalPrompt);
      if (chatresponse) {
        setGeneratedReadme(chatresponse);
        const projectData = prepareProjectData(chatresponse,selectedRepo);
        try {
          // Send the PATCH request to update the user's profile
          await updateUserProfile(projectData);

          toast.success('Project updated successfully!');
          getMe()
        } catch (error) {
          toast.error('Error Updating the projects');
          const errorMessage =
            error instanceof Error
              ? error.message
              : 'An unknown error occurred';
          console.error(errorMessage);
        }
        toast.success('README generated successfully');
      } else {
        console.error('error in genearating the readme');
        toast('generating the readme failed');
      }
    } catch (error) {
      toast.error(`❌ ${error}`);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePathSubmit = () => {};

  return (
    <div className="bg-white/30 dark:bg-transparent rounded-lg shadow-xl p-6 backdrop-blur-md border border-white/20 dark:border-gray-700/50 realtive">
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
            onClick={handlegetrepoContents}
            className="mt-6 w-full py-3 px-6 bg-blue-400/80 hover:bg-blue-600/30 text-white dark:text-white rounded-lg shadow-md transition-all duration-300 font-semibold"
          >
            Generate README
          </button>
        </div>
      </div>

      {/* Generate README Button */}
      {Loading && (
        <div className="absolute inset-0 bg-white/50 dark:bg-black/70 backdrop-blur-sm flex items-center justify-center rounded-lg">
          <GithubLoader />
          <span className="sr-only">Loading repositories...</span>
        </div>
      )}
    </div>
  );
};

export default ProjectReadme;

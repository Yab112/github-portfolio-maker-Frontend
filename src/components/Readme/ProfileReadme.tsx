'use client';

import type React from 'react';
import { useState } from 'react';
import { profileTemplates } from '../../../data/profileTemplates';
import Skills from '../portfolioMakerComp/Skills';
import AddOns from '../portfolioMakerComp/AddOns';
import PersonalInfo from '../portfolioMakerComp/PersonalInfo';
import SocialLinks from '../portfolioMakerComp/SocialLinks';
import WorkInfo from '../portfolioMakerComp/WorkInfo';
import { useForm } from '../../hooks/useForm';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import GithubLoader from '../GithubLoader';
import { ReadmePrompt } from '../../../data/prompt';

interface ProfileReadmeProps {
  setGeneratedReadme: (readme: string) => void;
}

const ProfileReadme: React.FC<ProfileReadmeProps> = ({
  setGeneratedReadme,
}) => {
  const [selectedTemplate, setSelectedTemplate] = useState('minimal');
  const [Loading, setLoading] = useState<boolean>(false);
  const { formData } = useForm();
  const { GetHCatResponseApi } = useAuth();

  const handleGetRepoContents = async (): Promise<void> => {
    setLoading(true);
    try {
      toast('Start successfully fetching README...');

      console.log('DEBUG: formData', formData); // Debugging

      const formattedFiles = Object.entries(formData)
        .map(([filename, content]) => {
          let contentString: string;

          try {
            // Ensure content is converted to a string safely
            if (typeof content === 'string') {
              contentString = content;
            } else if (Array.isArray(content)) {
              contentString = content.join(', '); // Convert array to string
            } else if (typeof content === 'object' && content !== null) {
              contentString = JSON.stringify(content, null, 2); // Convert object to formatted JSON string
            } else {
              contentString = String(content); // Convert numbers, booleans, etc., to string
            }

            // Slice only if it's a string (extra safety)
            return `### ${filename}\n\`\`\`\n${contentString.slice(0, 1000)}...\n\`\`\``;
          } catch (err) {
            console.error(`Error processing field: ${filename}`, err);
            return `### ${filename}\n\`\`\`\n[Error processing content]\n\`\`\``;
          }
        })
        .join('\n\n');

      const finalPrompt = `
          ${ReadmePrompt}
  
          ## Project Files:
          ${formattedFiles}
  
          ## Selected Template:
          ${selectedTemplate}
        `;

      console.log('DEBUG: The finalPrompt looks like', finalPrompt);

      const chatResponse = await GetHCatResponseApi(finalPrompt);
      if (chatResponse) {
        console.log(chatResponse);
        setGeneratedReadme(chatResponse);
        toast.success('README generated successfully');
      } else {
        console.error('Error: Chat response was empty or invalid.');
        toast.error('Generating the README failed.');
      }
    } catch (error: unknown) {
      // Handle errors safely
      const errorMessage =
        error instanceof Error ? error.message : 'An unknown error occurred';
      toast.error(`❌ ${errorMessage}`);
      console.error('Unhandled error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-transparent rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
        Generate Profile README
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        Choose a template and generate your GitHub profile README
      </p>

      <div className="grid grid-cols-3 gap-4 mb-4">
        {profileTemplates.map((template) => (
          <label
            key={template.id}
            className={`flex flex-col items-center justify-between rounded-md border-2 p-4 cursor-pointer ${
              selectedTemplate === template.id
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900'
                : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
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
            <span className="text-sm font-medium text-gray-900 dark:text-white mb-2">
              {template.name}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400 text-center">
              {template.preview.slice(0, 50)}...
            </span>
          </label>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 p-8 bg-transparent border border-blue-800/60 rounded-lg">
        <div className="border-none gap-4 flex flex-col">
          <div className="bg-transparent border border-slate-400 rounded-lg shadow-md p-4 max-h-[350px]  flex flex-col">
            <div className="text-gray-700">
              <PersonalInfo />
            </div>
          </div>
          <div className="bg-transparent border border-slate-400 rounded-lg shadow-md p-4 min-h-[350px] flex flex-col P-8 flex-1">
            <h1 className="text-2xl font-semibold text-blue-600 mb-4">Add</h1>
            <div className="text-gray-700">
              <AddOns />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="bg-transparent border border-slate-400 rounded-lg shadow-md p-4 max-h-[560px]  flex flex-col">
            <h1 className="text-2xl font-semibold text-blue-600 mb-4">
              Skills
            </h1>
            <div className="text-gray-700">
              <Skills />
            </div>
          </div>

          <div className="bg-transparent border border-slate-400 rounded-lg shadow-md p-4 max-h-[300px] overflow-auto flex flex-col justify-between no-scrollbar">
            <h1 className="text-2xl font-semibold text-blue-600 mb-4">
              Social Links
            </h1>
            <div className="text-gray-700 max-h-[320px] m-2 p-2">
              <SocialLinks />
            </div>
          </div>
        </div>

        <div className="bg-transparent border border-slate-400 rounded-lg shadow-md p-4 max-h-[400px] overflow-auto flex flex-col justify-between no-scrollbar">
          <div className="text-gray-700 p-2 max-h-[350px] m-2">
            <WorkInfo />
          </div>
        </div>
      </div>

      <button
        onClick={handleGetRepoContents}
        className="w-64 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 mt-3 "
      >
        Generate Profile README
      </button>

      {Loading && (
        <div className="fixed inset-0 bg-white/50 dark:bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <GithubLoader />
          <span className="sr-only">Loading repositories...</span>
        </div>
      )}
    </div>
  );
};

export default ProfileReadme;

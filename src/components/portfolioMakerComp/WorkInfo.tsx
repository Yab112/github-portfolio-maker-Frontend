import React from 'react';
import { useForm } from '../../hooks/useForm';

const WorkInfo: React.FC = () => {
  const { formData, updateWorkData } = useForm();

  // Handles text input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    updateWorkData({ ...formData.work, [name]: value });
  };

  // Handles checkboxes for array-based fields
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    const currentArray = Array.isArray(
      formData.work[name as keyof typeof formData.work]
    )
      ? (formData.work[name as keyof typeof formData.work] as string[])
      : [];

    const updatedArray = checked
      ? [...currentArray, value]
      : currentArray.filter((item: string) => item !== value);

    updateWorkData({ ...formData.work, [name]: updatedArray });
  };

  // Handles radio button changes
  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateWorkData({
      ...formData.work,
      preferredWorkMode: e.target.value as 'Remote' | 'Hybrid' | 'On-site',
    });
  };

  // Handles toggle switc
  const handleToggleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateWorkData({ ...formData.work, availableForWork: e.target.checked });
  };

  return (
    <div className="bg-transparent p-6 rounded-lg shadow-md text-blue-300 ">
      <div className="max-h-[400px] overflow-auto shadow-lg p-4 no-scrollbar">
        <h2 className="text-2xl font-semibold mb-4 text-blue-500">
          Work Information
        </h2>

        {/* Current Work */}
        <div className="mb-4">
          <label className="block text-xl text-blue-500 font-medium">
            I'm currently working on
          </label>
          <input
            type="text"
            name="currentWork"
            value={formData.work.currentWork || ''}
            onChange={handleInputChange}
            className="mt-2 p-2 border border-blue-300 rounded w-full"
          />
        </div>

        {/* Work Experience */}
        <div className="mb-4">
          <label className="block text-xl text-blue-500 font-medium">
            Work Experience
          </label>
          <textarea
            name="workExperience"
            value={formData.work.workExperience || ''}
            onChange={handleInputChange}
            className="mt-2 p-2 border border-blue-300 rounded w-full h-24"
            placeholder="Briefly describe your past work experience..."
          />
        </div>

        {/* Available for Work (Toggle) */}
        <div className="mb-4 flex items-center">
          <label className="block text-xl text-blue-500 font-medium">
            Available for Work
          </label>
          <input
            type="checkbox"
            name="availableForWork"
            checked={formData.work.availableForWork || false}
            onChange={handleToggleChange}
            className="ml-2"
          />
        </div>

        {/* Preferred Work Mode */}
        <div className="mb-4">
          <label className="block text-xl text-blue-500 font-medium">
            Preferred Work Mode
          </label>
          <div className="flex gap-4 mt-2">
            {(['Remote', 'Hybrid', 'On-site'] as const).map((mode) => (
              <label key={mode} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="preferredWorkMode"
                  value={mode}
                  checked={formData.work.preferredWorkMode === mode}
                  onChange={handleRadioChange}
                  className="mr-2"
                />
                {mode}
              </label>
            ))}
          </div>
        </div>

        {/* Collaboration Interests */}
        <div className="mb-4">
          <label className="block text-xl text-blue-500 font-medium">
            I'm looking to collaborate on
          </label>
          <div className="flex flex-wrap gap-2 mt-2">
            {['Open Source', 'Web Development', 'AI', 'Blockchain'].map(
              (topic) => (
                <label key={topic} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="collaborationInterests"
                    value={topic}
                    checked={formData.work.collaborationInterests.includes(
                      topic
                    )}
                    onChange={handleCheckboxChange}
                    className="mr-2"
                  />
                  {topic}
                </label>
              )
            )}
          </div>
        </div>

        {/* Learning Goals */}
        <div className="mb-4">
          <label className="block text-xl text-blue-500 font-medium">
            I'm currently learning
          </label>
          <div className="flex flex-wrap gap-2 mt-2">
            {['React', 'TypeScript', 'Python', 'Data Science'].map((goal) => (
              <label key={goal} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="learningGoals"
                  value={goal}
                  checked={formData.work.learningGoals.includes(goal)}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                {goal}
              </label>
            ))}
          </div>
        </div>

        {/* Tech Stack Used */}
        <div className="mb-4">
          <label className="block text-xl text-blue-500 font-medium">
            Tech Stack Used
          </label>
          <div className="flex flex-wrap gap-2 mt-2">
            {['JavaScript', 'Python', 'Node.js', 'Django', 'React', 'Vue'].map(
              (tech) => (
                <label key={tech} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="techStackUsed"
                    value={tech}
                    checked={
                      formData.work.techStackUsed?.includes(tech) || false
                    }
                    onChange={handleCheckboxChange}
                    className="mr-2"
                  />
                  {tech}
                </label>
              )
            )}
          </div>
        </div>

        {/* Future Goals */}
        <div className="mb-4">
          <label className="block text-xl text-blue-500 font-medium">
            Future Goals
          </label>
          <textarea
            name="futureGoals"
            value={formData.work.futureGoals || ''}
            onChange={handleInputChange}
            className="mt-2 p-2 border border-blue-300 rounded w-full h-24"
            placeholder="Where do you see yourself in the next few years?"
          />
        </div>
      </div>
    </div>
  );
};

export default WorkInfo;

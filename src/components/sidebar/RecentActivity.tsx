import React, { useRef, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useForm } from '../../hooks/useForm';

const RecentActivity: React.FC = () => {
  const { user } = useAuth();
  const { setProfilegeneratedReadme, setProjectgeneratedReadme, setActiveTab } =
    useForm();
  console.log('DEBUG: user', user);

  const bottomRef = useRef<HTMLDivElement | null>(null);
  const [hasScrolled, setHasScrolled] = useState(false);

  const recentActivity =
    user?.projects?.map((project) => ({
      project: project.key,
      value: project.value,
      category: project.category,
    })) || [];

  const handleclick = (projectkey: string) => {
    console.log('Button clicked:', projectkey);
    const selectedProject = user?.projects?.find(
      (project) => project.key === projectkey
    );
    // console.log('Button clicked:', selectedProject);
    if (selectedProject?.category === 'Project') {
      setProjectgeneratedReadme(selectedProject.value);
      setActiveTab('project');
    } else if (selectedProject?.category === 'Profile') {
      setProfilegeneratedReadme(selectedProject.value);
      setActiveTab('profile');
    }
    if (!hasScrolled) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
      setHasScrolled(true);
    }
  };

  return (
    <div className="space-y-2 overflow-y-auto">
      {recentActivity
        .slice(0)
        .reverse()
        .map((activity, i) => (
          <div
            key={i}
            className="p-2 text-sm rounded-md hover:bg-gray-200 dark:hover:bg-blue-700 cursor-pointer dark:text-gray-300"
            onClick={() => handleclick(activity.project)}
          >
            {activity.project}
            {activity.category === 'Project' ? ` (project)` : ' (Profile)'}
          </div>
        ))}
      <div ref={bottomRef} />
    </div>
  );
};

export default RecentActivity;

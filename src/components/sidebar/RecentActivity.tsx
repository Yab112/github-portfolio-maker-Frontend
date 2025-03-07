import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useForm } from '../../hooks/useForm';

const RecentActivity: React.FC = () => {
  const { user } = useAuth();
  const { setSelectedReadme } = useForm();

  const recentActivity =
    user?.projects?.map((project) => ({
      project: project.key,
      time: new Date(project._id).toLocaleString(),
      value: project.value,
      category: project.category,
    })) || [];

  const handleclick = (projectkey: string) => {
    const selectedProject = user?.projects?.find(
      (project) => project.key === projectkey
    );
    if (selectedProject) {
      setSelectedReadme(selectedProject.value);
    }
  };

  return (
    <div className="space-y-2 overflow-y-auto">
      {recentActivity.map((activity, i) => (
        <div
          key={i}
          className="p-2 text-sm rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
        >
          <button
            onClick={() => handleclick(activity.project)}
            className="font-medium text-gray-800 dark:text-slate-100/90"
          >
            {activity.project}
          </button>
        </div>
      ))}
    </div>
  );
};

export default RecentActivity;

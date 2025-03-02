import React from 'react';
import { useForm } from '../../hooks/useForm';


const PersonalInfo: React.FC = () => {
   const { formData, updatePersonalData } = useForm();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Update the appropriate part of formData using the context update function
    updatePersonalData({
      ...formData.personalData,
      [name]: value,
    });
  };

  return (
    <div className="bg-transparent text-blue-400 p-6 rounded-lg shadow-md max-h-[320px] overflow-auto no-scrollbar">
      <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
      
      <div className="mb-4">
        <label className="block text-sm font-medium">Title</label>
        <input
          type="text"
          name="title"
          value={formData.personalData.title || ''}
          onChange={handleChange}
          className="mt-2 p-2 border border-gray-300 rounded w-full"
          placeholder="Enter your title"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium">Portfolio Tags</label>
        <input
          type="text"
          name="portfolioTags"
          value={formData.personalData.portfolioTags || ''}
          onChange={handleChange}
          className="mt-2 p-2 border border-gray-300 rounded w-full"
          placeholder="e.g. Web Development, Design"
        />
      </div>
    </div>
  );
};

export default PersonalInfo;

import React from 'react';
import { useForm } from '../../hooks/useForm';
import { skillsData, Skill } from "../../constants/skillsIcons";

const Skills: React.FC = () => {
  const { formData, updateSkillsData } = useForm();

  // Ensure `category` is a valid key of `formData.skills`
  const handleSkillChange = (category: keyof typeof formData.skills, skill: string) => {
    const updatedSkills = { ...formData.skills };

    if (!updatedSkills[category]) updatedSkills[category] = []; // Ensure array exists

    if (updatedSkills[category].includes(skill)) {
      updatedSkills[category] = updatedSkills[category].filter((s) => s !== skill);
    } else {
      updatedSkills[category] = [...updatedSkills[category], skill];
    }

    // Use context function to update state
    updateSkillsData(updatedSkills);
  };

  return (
    <div className="bg-transparent p-6 rounded-lg shadow-md">
      <div className='flex flex-col overflow-auto max-h-[400px] no-scrollbar'>
          {Object.entries(skillsData).map(([category, skills]) => {
            const typedCategory = category as keyof typeof formData.skills; // Ensure correct typing
            return (
              <div key={category} className="mb-4">
                <h3 className="text-lg font-medium items-center flex text-blue-200 p-2 m-2 border-b border-blue-300">{category}</h3>
                <div className="flex flex-wrap gap-3">
                  {skills.map(({ name, icon: Icon }: Skill) => (
                    <button
                      key={name}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg border border-blue-400 transition-all duration-300
                        ${formData.skills[typedCategory]?.includes(name) ? 'bg-blue-500 text-slate-300 shadow-lg' : 'bg-transparent text-blue-600/80 hover:bg-blue-100'}
                      `}
                      onClick={() => handleSkillChange(typedCategory, name)}
                    >
                      <Icon className={`w-6 h-6  ${formData.skills[typedCategory]?.includes(name) ? 'bg-blue-500 text-white shadow-lg':'text-blue-500'} ` }/> {name}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Skills;

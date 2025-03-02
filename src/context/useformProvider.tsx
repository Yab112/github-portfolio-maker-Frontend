import { useState, ReactNode } from 'react';
import FormContext, { FormData, FormContextType } from './useFormContext';

interface FormProviderProps {
  children: ReactNode;
}

const FormProvider = ({ children }: FormProviderProps) => {
  const [formData, setFormData] = useState<FormData>({
    personalData: {
      title: '',
      portfolioTags: [],
    },
    work: {
      currentWork: '',
      collaborationInterests: [],
      learningGoals: [],
      workExperience: 'i have been working on the backend side of the project in the nomads company',
      availableForWork: false,
      preferredWorkMode: 'Remote',
      techStackUsed: [],
      futureGoals: 'learn Devops',
    },
    skills: {
      programmingLanguages: [],
      frontendDevelopment: [],
      backendDevelopment: [],
      mobileAppDevelopment: [],
      aiMl: [],
      databases: [],
      dataVisualization: [],
      devOps: [],
      noCode: [],
      frameworks: [],
      testing: [],
      software: [],
      gameEngines: [],
      other: [],
    },
    social: {
      socialLinks: [],
    },
    addOns: {
      githubBadges: false,
      blogIntegration: false,
      topLanguages: false,
      streakStats: false,
      profileViews: false,
      contributionsGraph: false,
      followersCount: false,
      repositoryCount: false,
      githubTrophy: false,
      repositoryStars: false,
      commitStats: false,
      recentActivity: false,
    },
  });

  // Actions to update form data
  const updatePersonalData = (personalData: FormData['personalData']) => {
    setFormData((prevData: FormData) => ({
      ...prevData,
      personalData,
    }));
  };

  const updateWorkData = (workData: FormData['work']) => {
    setFormData((prevData: FormData) => ({
      ...prevData,
      work: workData,
    }));
  };

  const updateSkillsData = (skillsData: FormData['skills']) => {
    setFormData((prevData: FormData) => ({
      ...prevData,
      skills: skillsData,
    }));
  };

  const updateSocialData = (socialData: FormData['social']) => {
    setFormData((prevData: FormData) => ({
      ...prevData,
      social: socialData,
    }));
  };

  const updateAddOnsData = (addOnsData: FormData['addOns']) => {
    setFormData((prevData: FormData) => ({
      ...prevData,
      addOns: addOnsData,
    }));
  };

  const submitForm = async () => {
    try {
      console.log('Form submitted with data:', formData);
    } catch (error) {
      console.error('Form submission failed:', error);
    }
  };

  const value: FormContextType = {
    formData,
    updatePersonalData,
    updateWorkData,
    updateSkillsData,
    updateSocialData,
    updateAddOnsData,
    submitForm,
  };

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};

export default FormProvider;

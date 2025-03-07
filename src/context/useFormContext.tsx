import { createContext } from 'react';

// Define the types for form data and actions
export interface FormData {
  personalData: {
    title: string;
    portfolioTags: string[];
  };
  work: {
    currentWork: string;
    collaborationInterests: string[];
    workExperience?: string;
    availableForWork?: boolean;
    preferredWorkMode?: 'Remote' | 'Hybrid' | 'On-site';
    learningGoals: string[];
    techStackUsed?: string[];
    futureGoals?: string;
  };
  skills: {
    programmingLanguages: string[];
    frontendDevelopment: string[];
    backendDevelopment: string[];
    mobileAppDevelopment: string[];
    aiMl: string[];
    databases: string[];
    dataVisualization: string[];
    devOps: string[];
    noCode: string[];
    frameworks: string[];
    testing: string[];
    software: string[];
    gameEngines: string[];
    other: string[];
  };
  social: {
    socialLinks: { name: string; url: string }[];
  };
  addOns: {
    githubBadges: boolean;
    blogIntegration: boolean;
    topLanguages: boolean; // Added new property
    streakStats: boolean; // Added new property
    profileViews: boolean; // Added new property
    contributionsGraph: boolean;
    followersCount: boolean;
    repositoryCount: boolean;
    githubTrophy: boolean;
    repositoryStars: boolean;
    commitStats: boolean;
    recentActivity: boolean;
  };
}

export interface FormContextType {
  formData: FormData;
  ProjectgeneratedReadme: string;
  setProjectgeneratedReadme: (generatedReadme: string) => void;
  generatedReadme: string;
  setgeneratedReadme: (generatedReadme: string) => void;
  ProfilegeneratedReadme: string;
  setProfilegeneratedReadme: (generatedReadme: string) => void;
  updatePersonalData: (personalData: FormData['personalData']) => void;
  updateWorkData: (workData: FormData['work']) => void;
  updateSkillsData: (skillsData: FormData['skills']) => void;
  updateSocialData: (socialData: FormData['social']) => void;
  updateAddOnsData: (addOnsData: FormData['addOns']) => void;
  submitForm: () => Promise<void>;
  selectedReadme: string;
  setSelectedReadme: (readme: string) => void;
}

const FormContext = createContext<FormContextType | null>(null);

export default FormContext;

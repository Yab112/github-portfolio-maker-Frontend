export const prepareProjectData = (
  projectValue: string,
  category: string,
  projectKey?: string
) => {
  return {
    value: projectValue,
    key: projectKey || `Readme_file_${new Date().toString().split('T')[0]}`,
    category: category, // Ensure category is correctly assigned
  };
};

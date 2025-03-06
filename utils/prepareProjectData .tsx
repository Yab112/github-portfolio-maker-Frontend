export const prepareProjectData = (projectValue:string, projectKey?:string) => {
    return {
      value: projectValue,
      key: projectKey || `Readme_file_${new Date().toString().split("T")[0]}`,
    };
  };
  
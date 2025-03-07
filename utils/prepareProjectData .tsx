export const prepareProjectData = (projectValue:string, projectKey?:string,category?:string) => {
    return {
      value: projectValue,
      key: projectKey || `Readme_file_${new Date().toString().split("T")[0]}`,
      category : category
    };
  };
  
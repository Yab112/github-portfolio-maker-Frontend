import { useState, useEffect } from 'react';
import AuthContext from './AuthContext';
import {
  getMe,
  login,
  logout,
  SignUp,
  verifyOtp,
  OtpResend,
  getChatResponse,
} from '../service/api';
import { GithubLoader } from '../components';
import axios from 'axios';
import { GithubRepository, RepoFile } from '../types/github';

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<{ id: string; email: string } | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  let GithubuserName: string;

  // Check if we're on a public page
  const isPublicPage =
    window.location.pathname === '/' ||
    window.location.pathname === '/login' ||
    window.location.pathname === '/signup' ||
    window.location.pathname === '/verify-otp' ||
    window.location.pathname === '/reset-password';

  useEffect(() => {
    if (!isPublicPage) {
      // Only check authentication on non-public pages
      const checkAuth = async () => {
        try {
          const userData = await getMe();
          if (userData) {
            setUser(userData);
            setIsAuthenticated(true);
          }
        } catch (error) {
          console.error('Authentication check failed:', error);
        } finally {
          setLoading(false);
        }
      };

      checkAuth();
    } else {
      setLoading(false); // Skip loading on public pages
    }
  }, [isPublicPage]);

  const signupUser = async (
    email: string,
    password: string,
    GithubUsername: string
  ) => {
    try {
      const response = await SignUp(email, password, GithubUsername);
      return response;
    } catch (error) {
      console.log('DEBUG: error in signup user', error);
      return undefined;
    }
  };

  const loginUser = async (email: string, password: string) => {
    try {
      const response = await login(email, password);
      const userData = await getMe();
      setUser(userData);
      setIsAuthenticated(true);
      return response;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const verifyOtpUser = async (otp: string) => {
    try {
      console.log(otp, 'DEBUG: otp accepted in the auth provider');
      await verifyOtp(otp);
      const userData = await getMe();
      setUser(userData);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Verify Otp Failed:', error);
      throw error;
    }
  };

  const resendOtp = async () => {
    try {
      await OtpResend();
    } catch (error) {
      console.error('Resending OTP Failed:', error);
      throw error;
    }
  };

  const logoutUser = async () => {
    try {
      await logout();
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  };

  const getrepos = async () => {
    try {
      const userData = await getMe();
      GithubuserName = userData.Githubusername;
      if (userData.Githubusername) {
        const githubApiUrl = `https://api.github.com/users/${userData.Githubusername}/repos`;

        // Add await and properly handle response
        const response = await axios.get(githubApiUrl);

        // Access response.data and map properly
        return response.data.map(
          (repository: GithubRepository) => repository.name
        );
      } else {
        throw new Error('GitHub username not found in user data');
      }
    } catch (error) {
      console.error('Error in fetching repos:', error);
      throw error;
    }
  };

  // Fetch the repo file structure
  const fetchRepoFiles = async (repo: string) => {
    try {
      const response = await axios.get(
        `https://api.github.com/repos/${GithubuserName}/${repo}/git/trees/main?recursive=1`
      );

      const requiredFiles = [
        'package.json',
        'requirements.txt',
        'pyproject.toml',
        'Cargo.toml',
        'composer.json',
        'pom.xml',
        'build.gradle',
        'LICENSE',
        'CONTRIBUTING.md',
        'Dockerfile',
        '.env.example',
        '.env',
        'tsconfig.json',
        'babel.config.js',
      ];

      // Filter for root directory files only
      const fileUrls = response.data.tree
        .filter(
          (file: RepoFile) =>
            file.type === 'blob' &&
            !file.path.includes('/') && // Exclude files in subdirectories
            requiredFiles.includes(file.path) // Exact match for filenames
        )
        .reduce((acc: { [key: string]: string }, file: RepoFile) => {
          acc[file.path] = file.url;
          return acc;
        }, {});

      return Object.keys(fileUrls).length > 0 ? fileUrls : {};
    } catch (error) {
      console.error('Error fetching repo files:', error);
      return {};
    }
  };

  // Fetch the content of a specific file
  const fetchFileContent = async (fileUrl: string) => {
    try {
      const response = await axios.get(fileUrl);

      if (response.data.encoding === 'base64') {
        // Decode the base64 content
        const decodedContent = atob(response.data.content);
        return decodedContent;
      }
    } catch (error) {
      console.error('Error fetching file content:', error);
      return undefined;
    }
  };

  const fetchAllRepoFiles = async (fileUrls: { [key: string]: string }) => {
    const fileContents: { [key: string]: string } = {};

    await Promise.all(
      Object.entries(fileUrls).map(async ([fileName, fileUrl]) => {
        const content = await fetchFileContent(fileUrl);
        if (content) {
          fileContents[fileName] = content;
        }
      })
    );

    return fileContents;
  };

  const GetHCatResponseApi = async (prompt:string) =>{
    try {
      const response = await getChatResponse(prompt)
      if (response){
        console.log(response)
        return response.data
      }
    } catch (error) {
      console.log(error)
      throw error
      
    }
  }

  const ChatResponse = async (prompt:string) =>{
    try {
      const response = await getChatResponse(prompt)
      if (response){
        console.log(response)
        return response.data
      }
    } catch (error) {
      console.log(error)
      throw error
      
    }
  }

  if (loading) {
    return (<div className="absolute inset-0 bg-white/50 dark:bg-black/70 backdrop-blur-sm flex items-center justify-center rounded-lg">
        <GithubLoader />
        <span className="sr-only">Loading repositories...</span>
      </div>);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loginUser,
        logoutUser,
        signupUser,
        verifyOtpUser,
        resendOtp,
        getrepos,
        fetchRepoFiles,
        fetchFileContent,
        fetchAllRepoFiles,
        GetHCatResponseApi,
        ChatResponse
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

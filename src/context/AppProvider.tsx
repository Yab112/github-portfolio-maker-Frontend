import React, { ReactNode } from "react";
import AuthProvider from "./AuthProvider";
import FormProvider from "./useformProvider";

interface AppProviderProps {
  children: ReactNode;
}

const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <AuthProvider>
        <FormProvider>{children}</FormProvider>
    </AuthProvider>
  );
};

export default AppProvider;

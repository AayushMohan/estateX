import React, { createContext, useContext, ReactNode, useMemo } from "react";

import { mockUser } from "./mockData";

interface GlobalContextType {
  isLogged: boolean;
  user: User | null;
  loading: boolean;
}

interface User {
  $id: string;
  name: string;
  email: string;
  avatar: string;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

interface GlobalProviderProps {
  children: ReactNode;
}

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const value = useMemo<GlobalContextType>(() => {
    const demoUser: User = {
      $id: mockUser.$id,
      name: mockUser.name,
      email: mockUser.email,
      avatar: mockUser.avatar,
    };

    return {
      isLogged: true,
      user: demoUser,
      loading: false,
    };
  }, []);

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

export const useGlobalContext = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (!context)
    throw new Error("useGlobalContext must be used within a GlobalProvider");

  return context;
};

export default GlobalProvider;

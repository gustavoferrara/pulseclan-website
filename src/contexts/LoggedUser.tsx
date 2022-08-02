import { createContext, SetStateAction, useContext, useState } from 'react';

import { UserType } from '@/types/types';

interface LoggedUserContextInterface {
  loggedUser: UserType | null;
  setLoggedUser: React.Dispatch<SetStateAction<UserType | null>>;
}

interface LoggedUserProps {
  children: React.ReactNode;
}

const LoggedUserContext = createContext<LoggedUserContextInterface | null>(
  null,
);

export const LoggedUserProvider = ({ children }: LoggedUserProps) => {
  const [loggedUser, setLoggedUser] = useState<UserType | null>(null);

  return (
    <LoggedUserContext.Provider value={{ loggedUser, setLoggedUser }}>
      {children}
    </LoggedUserContext.Provider>
  );
};

const useLoggedUserContext = () => useContext(LoggedUserContext)!;

export default useLoggedUserContext;

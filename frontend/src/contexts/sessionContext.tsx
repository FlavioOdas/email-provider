// this will create a context for the session containing the user e-mail
import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from 'react';

interface SessionContextData {
  user: string;
  setUser: (user: string) => void;
}

export const SessionContext = createContext<SessionContextData | null>(null);

const SessionProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState('');

  return (
    <SessionContext.Provider value={{ user, setUser }}>
      {children}
    </SessionContext.Provider>
  );
};

export function useSessionContext() {
  const context = useContext(SessionContext);

  if (!context) {
    throw new Error('useSessionContext must be used within a SessionProvider');
  }

  return context;
}

export default SessionProvider;

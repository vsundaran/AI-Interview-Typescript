import { createContext, ReactNode, useState } from "react";

const Auth = createContext({});

interface AuthContextProps {
  children?: ReactNode;
}

type UserData = {
  id: string;
  userName: string;
  token: string;
};

const AuthContext = ({ children }: AuthContextProps) => {
  const [user, setUser] = useState<UserData | null>(null);

  const handleLogin = (userData: UserData) => {
    setUser(userData);
  };

  return (
    <Auth.Provider value={{ user, setUser, handleLogin }}>
      {children}
    </Auth.Provider>
  );
};

export default AuthContext;

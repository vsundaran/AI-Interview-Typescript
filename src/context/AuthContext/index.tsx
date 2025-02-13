import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import LogoutConfirmModal from "../../components/elementes/logout";
import { useNavigate } from "react-router-dom";

// Define the type for the context value
interface AuthContextType {
  user: UserData | null;
  setUser: Dispatch<SetStateAction<UserData | null>>;
  handleLogin: (userData: UserData) => void;
  openLogoutModal: () => void;
}

const Auth = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  handleLogin: () => {},
  openLogoutModal: () => {},
});

interface AuthContextProps {
  children?: ReactNode;
}

type UserData = {
  id: string;
  userName: string;
  token: string;
};

export const useAuth = () => useContext(Auth);

const AuthContext = ({ children }: AuthContextProps) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const Navigate = useNavigate();

  const handleLogin = (userData: UserData) => {
    setUser(userData);
  };

  const openLogoutModal = () => setLogoutModalOpen(true);
  const closeLogoutModal = () => setLogoutModalOpen(false);

  const handleLogout = () => {
    setUser(null); // Clear user state
    console.log("User logged out"); // Add more logic like removing token, redirecting, etc.
    closeLogoutModal();
    Navigate("/");
  };

  return (
    <Auth.Provider value={{ user, setUser, handleLogin, openLogoutModal }}>
      {children}
      <LogoutConfirmModal
        open={logoutModalOpen}
        onClose={closeLogoutModal}
        onLogout={handleLogout}
      />
    </Auth.Provider>
  );
};

export default AuthContext;

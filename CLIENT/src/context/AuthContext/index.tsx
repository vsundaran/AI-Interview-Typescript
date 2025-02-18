import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import LogoutConfirmModal from "../../components/elementes/logout";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { UserData } from "../../services/API/types";
import { Loading } from "../../components/elementes/suspense-loading";

// Define the type for the context value
export interface AuthContextType {
  user: UserData | null;
  setUser: Dispatch<SetStateAction<UserData | null>>;
  handleLogin: (userData: UserData) => void;
  openLogoutModal: () => void;
  authLoading: boolean;
  setAuthLoading: Dispatch<SetStateAction<boolean>>;
}

const Auth = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  handleLogin: () => {},
  openLogoutModal: () => {},
  authLoading: false,
  setAuthLoading: (bool) => bool,
});

interface AuthContextProps {
  children?: ReactNode;
}

export const useAuth = () => useContext(Auth);

const AuthContext = ({ children }: AuthContextProps) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);

  const Navigate = useNavigate();
  const location = useLocation();

  const handleLogin = (userData: UserData) => {
    setUser(userData);
  };

  const openLogoutModal = () => setLogoutModalOpen(true);
  const closeLogoutModal = () => setLogoutModalOpen(false);

  const handleLogout = () => {
    const subRoute = location.pathname.split("/")[1];
    if (subRoute === "candidate") {
      Cookies.remove("candidateToken");
    } else if (subRoute === "organisation") {
      Cookies.remove("organisationToken");
    }
    setUser(null); // Clear user state
    console.log("User logged out"); // Add more logic like removing token, redirecting, etc.
    closeLogoutModal();
    Navigate("/");
  };

  return (
    <Auth.Provider
      value={{
        user,
        setUser,
        handleLogin,
        openLogoutModal,
        setAuthLoading,
        authLoading,
      }}
    >
      {authLoading ? (
        <Loading />
      ) : (
        <>
          {children}
          <LogoutConfirmModal
            open={logoutModalOpen}
            onClose={closeLogoutModal}
            onLogout={handleLogout}
          />
        </>
      )}
    </Auth.Provider>
  );
};

export default AuthContext;

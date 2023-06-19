import { createContext } from "react";

export interface IUser {
  id: number;
  username: string;
  email: string;
  userType: string;
}

interface AuthContextType {
  currentUser: IUser | null;
  setCurrentUser: (user: IUser | null) => void;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  setCurrentUser: () => {},
});

export default AuthContext;

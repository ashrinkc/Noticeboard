import { useState } from "react";
import AuthContext, { IUser } from "./AuthContext";

interface ContextWrapperProps {
  children: React.ReactNode;
}

const ContextWrapper = (props: ContextWrapperProps) => {
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default ContextWrapper;

import { createContext, useState } from "react";

export const UserContext = createContext({
  currentName: "",
  setCurrentName: () => null,
});

export const UserProvider = ({ children }) => {
  const [currentName, setCurrentName] = useState("");
  const value = { currentName, setCurrentName };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

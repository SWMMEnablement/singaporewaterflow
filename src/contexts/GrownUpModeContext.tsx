import React, { createContext, useContext, useState, ReactNode } from "react";

interface GrownUpModeContextType {
  isGrownUpMode: boolean;
  toggleGrownUpMode: () => void;
}

const GrownUpModeContext = createContext<GrownUpModeContextType | undefined>(undefined);

export const GrownUpModeProvider = ({ children }: { children: ReactNode }) => {
  const [isGrownUpMode, setIsGrownUpMode] = useState(false);

  const toggleGrownUpMode = () => setIsGrownUpMode(prev => !prev);

  return (
    <GrownUpModeContext.Provider value={{ isGrownUpMode, toggleGrownUpMode }}>
      {children}
    </GrownUpModeContext.Provider>
  );
};

export const useGrownUpMode = () => {
  const context = useContext(GrownUpModeContext);
  if (context === undefined) {
    throw new Error("useGrownUpMode must be used within a GrownUpModeProvider");
  }
  return context;
};

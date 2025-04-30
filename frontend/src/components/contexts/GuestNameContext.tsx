import React, { createContext, useContext, useState } from "react";

interface GuestNameContextType {
  guestName: string;
  setGuestName: (name: string) => void;
  error: string | null;
  setError: (error: string | null) => void;
}

const GuestNameContext = createContext<GuestNameContextType | undefined>(undefined);

export const GuestNameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [guestName, setGuestName] = useState("");
  const [error, setError] = useState<string | null>(null);

  return (
    <GuestNameContext.Provider value={{ guestName, setGuestName, error, setError }}>
      {children}
    </GuestNameContext.Provider>
  );
};

export const useGuestName = () => {
  const context = useContext(GuestNameContext);
  if (context === undefined) {
    throw new Error("useGuestName must be used within a GuestNameProvider");
  }
  return context;
};

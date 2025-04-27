import React, { useState } from "react";
import PreferenceInput from "@/components/PreferenceInput";
import { Button } from "@/components/ui/button";
import { useGuestName } from "./contexts/GuestNameContext";

interface AISuggestionPanelProps {
  onSubmit: (preferences: string, guestName: string) => void;
  isLoading?: boolean;
}

const AISuggestionPanel: React.FC<AISuggestionPanelProps> = ({ onSubmit, isLoading = false }) => {
  const [preferences, setPreferences] = useState("");
  const { guestName, setGuestName, error, setError } = useGuestName();
  const [preferencesError, setPreferencesError] = useState<string | null>(null);

  const handleSubmit = () => {
    setPreferencesError(null);
    setError(null);

    if (!preferences.trim()) {
      setPreferencesError("Preferencje nie mogą być puste.");
      return;
    }

    if (!guestName.trim()) {
      setError("Proszę podać imię gościa przed zamówieniem.");
      return;
    }

    onSubmit(preferences, guestName);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
      <PreferenceInput
        value={preferences}
        placeholder="Podaj swoje preferencje"
        error={preferencesError}
        onChange={setPreferences}
      />
      <div className="mt-4">
        <input
          type="text"
          value={guestName}
          onChange={(e) => setGuestName(e.target.value)}
          placeholder="Twoje imię"
          className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
      <Button className="mt-4" onClick={handleSubmit} disabled={isLoading}>
        {isLoading ? "Proponowanie..." : "Proponuj"}
      </Button>
    </div>
  );
};

export default AISuggestionPanel;

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
    <div
      className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg shadow-lg p-5 border border-white/20 dark:border-gray-700/30"
      data-testid="ai-suggestion-panel"
    >
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
          className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
          data-testid="guest-name-input"
        />
        {error && (
          <p className="text-red-500 text-sm mt-1" data-testid="guest-name-error">
            {error}
          </p>
        )}
      </div>
      <Button
        className="mt-4 bg-primary hover:bg-primary/90 transition-colors"
        onClick={handleSubmit}
        disabled={isLoading}
        data-testid="generate-drink-button"
      >
        {isLoading ? <span data-testid="suggestion-loading-indicator">Proponowanie...</span> : "Proponuj"}
      </Button>
    </div>
  );
};

export default AISuggestionPanel;

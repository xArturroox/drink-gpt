import React, { useState } from "react";
import PreferenceInput from "@/components/PreferenceInput";
import GuestNameInput from "@/components/GuestNameInput";
import { Button } from "@/components/ui/button";

interface AISuggestionPanelProps {
  onSubmit: (preferences: string, guestName: string) => void;
  isLoading?: boolean;
}

const AISuggestionPanel: React.FC<AISuggestionPanelProps> = ({ onSubmit, isLoading = false }) => {
  const [preferences, setPreferences] = useState("");
  const [guestName, setGuestName] = useState("");
  const [errors, setErrors] = useState<{ preferences?: string; guestName?: string }>({});

  const handleSubmit = () => {
    const newErrors: typeof errors = {};
    if (!preferences.trim()) newErrors.preferences = "Preferencje nie mogą być puste.";
    if (!guestName.trim()) newErrors.guestName = "Imię gościa nie może być puste.";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    onSubmit(preferences, guestName);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
      <PreferenceInput
        value={preferences}
        placeholder="Podaj swoje preferencje"
        error={errors.preferences}
        onChange={setPreferences}
      />
      <GuestNameInput value={guestName} placeholder="Twoje imię" error={errors.guestName} onChange={setGuestName} />
      <Button className="mt-4" onClick={handleSubmit} disabled={isLoading}>
        {isLoading ? "Proponowanie..." : "Proponuj"}
      </Button>
    </div>
  );
};

export default AISuggestionPanel;

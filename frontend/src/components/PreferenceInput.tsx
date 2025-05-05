import React from "react";

interface PreferenceInputProps {
  value: string;
  placeholder: string;
  error: string | null;
  onChange: (value: string) => void;
}

const PreferenceInput: React.FC<PreferenceInputProps> = ({ value, placeholder, error, onChange }) => {
  return (
    <div className="mb-4">
      <label htmlFor="preferences" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        Preferencje
      </label>
      <textarea
        id="preferences"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full p-3 border rounded-md min-h-[100px] dark:bg-gray-700/90 dark:border-gray-600 focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all resize-y"
        data-testid="preference-input"
      />
      {error && (
        <p className="text-red-500 text-sm mt-1" data-testid="preference-input-error">
          {error}
        </p>
      )}
    </div>
  );
};

export default PreferenceInput;

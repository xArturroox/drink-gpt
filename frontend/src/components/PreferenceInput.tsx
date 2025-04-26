import React from "react";

interface PreferenceInputProps {
  value: string;
  placeholder: string;
  error?: string;
  onChange: (value: string) => void;
}

const PreferenceInput: React.FC<PreferenceInputProps> = ({ value, placeholder, error, onChange }) => {
  return (
    <div className="mb-4">
      <label htmlFor="preferences" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        Preferencje
      </label>
      <input
        id="preferences"
        type="text"
        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default PreferenceInput;

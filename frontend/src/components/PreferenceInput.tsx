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
        className="w-full p-2 border rounded-md min-h-[100px] dark:bg-gray-700 dark:border-gray-600"
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default PreferenceInput;

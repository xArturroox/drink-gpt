import React from "react";

interface GuestNameInputProps {
  value: string;
  placeholder: string;
  error?: string;
  onChange: (value: string) => void;
}

const GuestNameInput: React.FC<GuestNameInputProps> = ({ value, placeholder, error, onChange }) => {
  return (
    <div className="mb-4">
      <label htmlFor="guestName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        Imię gościa
      </label>
      <input
        id="guestName"
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

export default GuestNameInput;

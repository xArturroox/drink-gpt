import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

interface IngredientModalFormProps {
  initialValues?: { name: string; available: boolean };
  onSubmit: (data: { name: string; available: boolean }) => void;
  onCancel: () => void;
}

const IngredientModalForm: React.FC<IngredientModalFormProps> = ({ initialValues, onSubmit, onCancel }) => {
  const [name, setName] = useState(initialValues?.name || "");
  const [available, setAvailable] = useState(initialValues?.available ?? true);
  const [errors, setErrors] = useState<{ name?: string }>({});
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dialogRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrors({ name: "Nazwa jest wymagana" });
      return;
    }
    setErrors({});
    onSubmit({ name, available });
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div ref={dialogRef} tabIndex={-1} className="bg-white p-6 rounded-md shadow-lg max-w-md w-full">
        <h2 className="text-lg font-semibold mb-4">{initialValues ? "Edytuj składnik" : "Dodaj składnik"}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block font-medium mb-1">
              Nazwa
            </label>
            <input
              id="name"
              type="text"
              className="w-full border px-3 py-2 rounded-md"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            {errors.name && <p className="text-destructive text-sm mt-1">{errors.name}</p>}
          </div>
          <div className="flex items-center space-x-2">
            <input
              id="available"
              type="checkbox"
              checked={available}
              onChange={(e) => setAvailable(e.target.checked)}
            />
            <label htmlFor="available">Dostępny</label>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onCancel} type="button">
              Anuluj
            </Button>
            <Button type="submit" disabled={!name.trim()}>
              Zapisz
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IngredientModalForm;

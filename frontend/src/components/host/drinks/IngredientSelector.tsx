import React from "react";
import { useIngredients } from "@/components/hooks/useIngredients";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { DrinkFormValues } from "@/types";

interface IngredientSelectorProps {
  fields: { id: string }[];
  append: (value: { id: number; quantity: number; unit: string }) => void;
  remove: (index: number) => void;
  register: UseFormRegister<DrinkFormValues>;
  errors: FieldErrors<DrinkFormValues>;
}

const IngredientSelector: React.FC<IngredientSelectorProps> = ({ fields, append, remove, register, errors }) => {
  const { ingredients } = useIngredients();

  return (
    <fieldset className="mb-4">
      <legend className="block mb-1 font-medium">Ingredients</legend>
      {fields.map((field, index) => (
        <div key={field.id} className="flex space-x-2 items-center mb-2">
          <select
            className="border rounded px-2 py-1"
            {...register(`ingredients.${index}.id`, { required: "Ingredient is required" })}
          >
            <option value="">Select ingredient</option>
            {ingredients.map((ing) => (
              <option key={ing.id} value={ing.id}>
                {ing.name}
              </option>
            ))}
          </select>
          <input
            type="number"
            className="w-16 border rounded px-2 py-1"
            placeholder="Qty"
            {...register(`ingredients.${index}.quantity`, {
              required: "Quantity is required",
              min: { value: 1, message: "Must be > 0" },
            })}
          />
          <input
            type="text"
            className="w-16 border rounded px-2 py-1"
            placeholder="Unit"
            {...register(`ingredients.${index}.unit`, { required: "Unit is required" })}
          />
          <button
            type="button"
            className="text-red-600"
            onClick={() => remove(index)}
          >
            &times;
          </button>
        </div>
      ))}
      <button
        type="button"
        className="mt-2 text-blue-600"
        onClick={() => append({ id: 0, quantity: 1, unit: "" })}
      >
        Add Ingredient
      </button>
      {errors.ingredients && (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        <p className="text-red-600 mt-1">
          {(errors.ingredients as any).message || "Select at least one ingredient"}
        </p>
      )}
    </fieldset>
  );
};

export default IngredientSelector; 
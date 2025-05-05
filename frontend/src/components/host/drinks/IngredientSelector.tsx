import React from "react";
import { useIngredients } from "@/components/hooks/useIngredients";
import type { FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";
import type { DrinkFormValues } from "@/types";

interface IngredientField {
  id: number;
  quantity: number;
  unit: string;
}

interface IngredientSelectorProps {
  fields: IngredientField[];
  append: (value: { id: number; quantity: number; unit: string }) => void;
  remove: (index: number) => void;
  register: UseFormRegister<DrinkFormValues>;
  watch: UseFormWatch<DrinkFormValues>;
  errors: FieldErrors<DrinkFormValues>;
}

const IngredientSelector: React.FC<IngredientSelectorProps> = ({ fields, append, remove, register, watch, errors }) => {
  const { ingredients } = useIngredients();

  return (
    <fieldset className="mb-4">
      <legend className="block mb-1 font-medium">Składniki</legend>
      {fields.map((field, index) => {
        const ingredientId = watch(`ingredients.${index}.id`);

        return (
          <div key={field.id} className="flex space-x-2 items-center mb-2">
            <select
              className="border rounded px-2 py-1"
              value={ingredientId || ""}
              {...register(`ingredients.${index}.id` as const, { required: "Składnik jest wymagany" })}
            >
              <option value="" disabled>
                Wybierz składnik
              </option>
              {ingredients.map((ing) => (
                <option key={ing.id} value={ing.id}>
                  {ing.name}
                </option>
              ))}
            </select>
            <input
              type="number"
              className="w-16 border rounded px-2 py-1"
              placeholder="Ilość"
              {...register(`ingredients.${index}.quantity` as const, {
                required: "Ilość jest wymagana",
                min: { value: 1, message: "Musi być > 0" },
              })}
            />
            <input
              type="text"
              className="w-16 border rounded px-2 py-1"
              placeholder="Jedn."
              {...register(`ingredients.${index}.unit` as const, { required: "Jednostka jest wymagana" })}
            />
            <button type="button" className="text-red-600" onClick={() => remove(index)}>
              &times;
            </button>
          </div>
        );
      })}
      <button type="button" className="mt-2 text-blue-600" onClick={() => append({ id: 0, quantity: 1, unit: "" })}>
        Dodaj składnik
      </button>
      <p className="text-red-600 mt-1">
        {errors.ingredients && "message" in errors.ingredients
          ? errors.ingredients.message
          : "Wybierz przynajmniej jeden składnik"}
      </p>
    </fieldset>
  );
};

export default IngredientSelector;

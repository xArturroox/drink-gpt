import React, { useEffect } from "react";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { useFieldArray, useForm } from "react-hook-form";
import type { DrinkFormValues } from "@/types";
import { Button } from "@/components/ui/button";
import IngredientSelector from "./IngredientSelector";

interface DrinkFormModalProps {
  isOpen: boolean;
  initialValues?: DrinkFormValues;
  onSubmit: (values: DrinkFormValues) => void;
  onClose: () => void;
}

const DrinkFormModal: React.FC<DrinkFormModalProps> = ({ isOpen, initialValues, onSubmit, onClose }) => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DrinkFormValues>({
    defaultValues: initialValues || { name: "", ingredients: [], recipe: "" },
  });

  const { fields, append, remove } = useFieldArray({ control, name: "ingredients" });

  useEffect(() => {
    if (initialValues) {
      reset(initialValues);
    } else {
      reset({ name: "", ingredients: [], recipe: "" });
    }
  }, [initialValues, reset]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-md shadow-lg w-full max-w-lg">
        <h2 className="text-lg font-semibold mb-4">{initialValues ? "Edit Drink" : "Add Drink"}</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="drink-name" className="block mb-1 font-medium">
              Name
            </label>
            <input
              id="drink-name"
              type="text"
              className="w-full border rounded px-2 py-1"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && <p className="text-red-600 mt-1">{errors.name.message}</p>}
          </div>

          <div className="mb-4">
            <IngredientSelector
              fields={fields}
              append={append}
              remove={remove}
              register={register as UseFormRegister<DrinkFormValues>}
              errors={errors as FieldErrors<DrinkFormValues>}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="drink-recipe" className="block mb-1 font-medium">
              Recipe
            </label>
            <textarea
              id="drink-recipe"
              className="w-full border rounded px-2 py-1"
              rows={4}
              {...register("recipe", { required: "Recipe is required" })}
            />
            {errors.recipe && <p className="text-red-600 mt-1">{errors.recipe.message}</p>}
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DrinkFormModal;

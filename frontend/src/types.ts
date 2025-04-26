export interface IngredientDTO {
  id: number;
  name: string;
  available: boolean;
}

export interface DrinkIngredientDTO {
  ingredient: IngredientDTO;
  quantity: number;
  unit: string;
}

export interface DrinkDTO {
  id: number;
  name: string;
  ingredients: DrinkIngredientDTO[];
  recipe: string;
}

export interface SuggestedDrinkDTO {
  id: number;
  name: string;
  description: string;
  ingredients: string;
  recipe: string;
}

export interface OrderDTO {
  id: number;
  drinkName: string;
  ingredients: string;
  recipe: string;
  guestName: string;
  orderTimestamp: number;
  served: boolean;
}

export interface IngredientRequestDTO {
  name: string;
  available: boolean;
}

export interface OrderRequestDTO {
  drinkName: string;
  ingredients: string;
  recipe: string;
  guestName: string;
}

export interface AISuggestionRequestDTO {
  preferences: string;
}

export interface DrinkViewModel {
  id: number;
  name: string;
  ingredients: string; // joined list of ingredients e.g. "Rum:50ml; Limonka:20g"
  recipe: string;
}

export interface AISuggestionViewModel {
  name: string;
  description: string;
  ingredients: string;
  recipe: string;
}

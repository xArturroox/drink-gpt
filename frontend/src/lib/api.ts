import type {
  AISuggestionRequestDTO,
  DrinkDTO,
  ErrorResponse,
  IngredientDTO,
  IngredientRequestDTO,
  LoginCredentials,
  LoginResponse,
  OrderDTO,
  OrderRequestDTO,
  Page,
  SuggestedDrinkDTO,
} from "../types";
import { createFetchOptions, createUrl } from "./api/fetchConfig";

// Auth API
export async function login(credentials: LoginCredentials): Promise<LoginResponse> {
  const response = await fetch(
    createUrl("/api/auth/login"),
    createFetchOptions({
      method: "POST",
      body: JSON.stringify(credentials),
    })
  );

  if (!response.ok) {
    const error = (await response.json()) as ErrorResponse;
    throw new Error(error.message || "Invalid login or password");
  }

  return response.json();
}

export async function logout(): Promise<void> {
  const response = await fetch(
    createUrl("/api/auth/logout"),
    createFetchOptions({
      method: "POST",
    })
  );

  if (!response.ok) {
    throw new Error("Logout failed");
  }
}

// Ingredient API
export async function fetchIngredients(params?: {
  page?: number;
  size?: number;
  available?: boolean;
}): Promise<IngredientDTO[]> {
  const queryParams = new URLSearchParams();
  if (params?.page) queryParams.append("page", params.page.toString());
  if (params?.size) queryParams.append("size", params.size.toString());
  if (params?.available !== undefined) queryParams.append("available", params.available.toString());

  const response = await fetch(createUrl(`/api/ingredients?${queryParams.toString()}`), createFetchOptions());

  if (!response.ok) throw new Error("Failed to fetch ingredients");
  const pageResponse: Page<IngredientDTO> = await response.json();
  return pageResponse.content;
}

export async function fetchIngredientById(id: number): Promise<IngredientDTO> {
  const response = await fetch(createUrl(`/api/ingredients/${id}`), createFetchOptions());

  if (!response.ok) throw new Error(`Failed to fetch ingredient with id ${id}`);
  return response.json();
}

export async function createIngredient(request: IngredientRequestDTO): Promise<IngredientDTO> {
  const response = await fetch(
    createUrl("/api/ingredients"),
    createFetchOptions({
      method: "POST",
      body: JSON.stringify(request),
    })
  );

  if (!response.ok) throw new Error("Failed to create ingredient");
  return response.json();
}

export async function updateIngredient(id: number, request: IngredientRequestDTO): Promise<IngredientDTO> {
  const response = await fetch(
    createUrl(`/api/ingredients/${id}`),
    createFetchOptions({
      method: "PATCH",
      body: JSON.stringify(request),
    })
  );

  if (!response.ok) throw new Error("Failed to update ingredient");
  return response.json();
}

export async function deleteIngredient(id: number): Promise<void> {
  const response = await fetch(
    createUrl(`/api/ingredients/${id}`),
    createFetchOptions({
      method: "DELETE",
    })
  );

  if (!response.ok) throw new Error("Failed to delete ingredient");
}

// Order API
export async function fetchOrders(params?: { page?: number; size?: number; status?: string }): Promise<OrderDTO[]> {
  const queryParams = new URLSearchParams();
  if (params?.page !== undefined) queryParams.append("page", params.page.toString());
  if (params?.size !== undefined) queryParams.append("size", params.size.toString());
  if (params?.status) queryParams.append("status", params.status);

  const response = await fetch(createUrl(`/api/orders?${queryParams.toString()}`), createFetchOptions());

  if (!response.ok) throw new Error("Failed to fetch orders");
  const pageResponse: Page<OrderDTO> = await response.json();
  return pageResponse.content;
}

export async function createOrder(request: OrderRequestDTO): Promise<OrderDTO> {
  const response = await fetch(
    createUrl("/api/orders"),
    createFetchOptions({
      method: "POST",
      body: JSON.stringify(request),
    })
  );

  if (!response.ok) throw new Error("Failed to create order");
  return response.json();
}

export async function markOrderAsServed(orderId: number): Promise<void> {
  const response = await fetch(
    createUrl(`/api/orders/${orderId}/served`),
    createFetchOptions({
      method: "PATCH",
    })
  );

  if (!response.ok) throw new Error("Failed to mark order as served");
}

export async function deleteOrder(orderId: number): Promise<void> {
  const response = await fetch(
    createUrl(`/api/orders/${orderId}`),
    createFetchOptions({
      method: "DELETE",
    })
  );

  if (!response.ok) throw new Error("Failed to delete order");
}

// Drink API
export async function fetchDrinks(params?: {
  page?: number;
  size?: number;
  ingredientId?: number;
}): Promise<DrinkDTO[]> {
  const queryParams = new URLSearchParams();
  if (params?.page) queryParams.append("page", params.page.toString());
  if (params?.size) queryParams.append("size", params.size.toString());
  if (params?.ingredientId) queryParams.append("ingredientId", params.ingredientId.toString());

  const response = await fetch(createUrl(`/api/drinks?${queryParams.toString()}`), createFetchOptions());

  if (!response.ok) throw new Error("Failed to fetch drinks");
  const pageResponse: Page<DrinkDTO> = await response.json();
  return pageResponse.content;
}

export async function fetchDrinkById(id: number): Promise<DrinkDTO> {
  const response = await fetch(createUrl(`/api/drinks/${id}`), createFetchOptions());

  if (!response.ok) throw new Error(`Failed to fetch drink with id ${id}`);
  return response.json();
}

export async function createDrink(request: DrinkDTO): Promise<DrinkDTO> {
  const response = await fetch(
    createUrl("/api/drinks"),
    createFetchOptions({
      method: "POST",
      body: JSON.stringify(request),
    })
  );

  if (!response.ok) throw new Error("Failed to create drink");
  return response.json();
}

export async function updateDrink(id: number, request: DrinkDTO): Promise<DrinkDTO> {
  const response = await fetch(
    createUrl(`/api/drinks/${id}`),
    createFetchOptions({
      method: "PUT",
      body: JSON.stringify(request),
    })
  );

  if (!response.ok) throw new Error("Failed to update drink");
  return response.json();
}

export async function deleteDrink(id: number): Promise<void> {
  const response = await fetch(
    createUrl(`/api/drinks/${id}`),
    createFetchOptions({
      method: "DELETE",
    })
  );

  if (!response.ok) throw new Error("Failed to delete drink");
}

// AI Suggestion API
export async function suggestDrink(request: AISuggestionRequestDTO): Promise<SuggestedDrinkDTO> {
  const response = await fetch(
    createUrl("/api/ai/suggestion"),
    createFetchOptions({
      method: "POST",
      body: JSON.stringify(request),
    })
  );

  if (!response.ok) throw new Error("Failed to suggest drink");
  return response.json();
}

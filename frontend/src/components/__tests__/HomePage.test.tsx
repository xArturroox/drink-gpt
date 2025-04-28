import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import HomePage from "../HomePage";
import { createOrder, suggestDrink } from "../../lib/api";
import { useDrinks } from "../hooks/useDrinks";
import AISuggestionPanel from "../AISuggestionPanel";

// Mock the API functions
vi.mock("../../lib/api", () => ({
  suggestDrink: vi.fn(),
  createOrder: vi.fn(),
}));

// Mock the useDrinks hook
vi.mock("../hooks/useDrinks", () => ({
  useDrinks: vi.fn(),
}));

// Mock the child components to simplify testing
vi.mock("../DrinksList", () => ({
  default: vi.fn(({ onSelect }) => (
    <div data-testid="drinks-list">
      <button data-testid="select-drink" onClick={() => onSelect({
        id: 1,
        name: "Test Drink",
        ingredients: ["test ingredient"],
        recipe: "test recipe",
      }, "Test Guest")}>
        Select Drink
      </button>
    </div>
  )),
}));

vi.mock("../AISuggestionPanel", () => ({
  default: vi.fn(({ onSubmit, isLoading }) => (
    <div data-testid="ai-suggestion-panel">
      <span data-testid="loading-state">{isLoading ? "Loading" : "Not Loading"}</span>
      <button
        data-testid="submit-ai-suggestion"
        onClick={() => onSubmit("Test preferences", "Test Guest")}
      >
        Submit
      </button>
    </div>
  )),
}));

vi.mock("../SuggestionResultModal", () => ({
  default: vi.fn(({ suggestion, isOpen, onConfirm, onCancel }) => (
    isOpen ? (
      <div data-testid="suggestion-modal">
        <div data-testid="suggestion-details">
          {suggestion.name} - {suggestion.description}
        </div>
        <button
          data-testid="confirm-suggestion"
          onClick={() => onConfirm(suggestion, "Test Guest")}
        >
          Confirm
        </button>
        <button data-testid="cancel-suggestion" onClick={onCancel}>Cancel</button>
      </div>
    ) : null
  )),
}));

vi.mock("../OrderConfirmationModal", () => ({
  default: vi.fn(({ order, isOpen, onClose }) => (
    isOpen ? (
      <div data-testid="order-modal">
        <div data-testid="order-details">
          {order.drinkName} - {order.guestName}
        </div>
        <button data-testid="close-order" onClick={onClose}>Close</button>
      </div>
    ) : null
  )),
}));

// Mock GuestNameContext
vi.mock("../contexts/GuestNameContext", () => ({
  GuestNameProvider: vi.fn(({ children }) => <div data-testid="guest-name-provider">{children}</div>),
}));

describe("HomePage", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // Setup default mock implementation
    (useDrinks as any).mockReturnValue({
      drinks: [
        { id: 1, name: "Test Drink", ingredients: ["test ingredient"], recipe: "test recipe" },
      ],
    });

    (suggestDrink as any).mockResolvedValue({
      name: "AI Drink",
      description: "AI generated drink",
      ingredients: ["AI ingredient"],
      recipe: "AI recipe",
    });

    (createOrder as any).mockResolvedValue({
      id: 123,
      drinkName: "Test Order Drink",
      guestName: "Test Guest",
      status: "PENDING",
      createdAt: new Date().toISOString(),
    });
  });

  it("renders the component with initial state", () => {
    render(<HomePage />);

    expect(screen.getByTestId("guest-name-provider")).toBeInTheDocument();
    expect(screen.getByTestId("ai-suggestion-panel")).toBeInTheDocument();
    expect(screen.getByTestId("drinks-list")).toBeInTheDocument();
    expect(screen.queryByTestId("suggestion-modal")).not.toBeInTheDocument();
    expect(screen.queryByTestId("order-modal")).not.toBeInTheDocument();
  });

  it("handles AI suggestion submission", async () => {
    render(<HomePage />);

    // Submit AI suggestion
    fireEvent.click(screen.getByTestId("submit-ai-suggestion"));

    // Verify loading state
    expect(screen.getByTestId("loading-state").textContent).toBe("Loading");

    // Verify API was called with correct params
    expect(suggestDrink).toHaveBeenCalledWith({ preferences: "Test preferences" });

    // Wait for suggestion to be processed
    await waitFor(() => {
      expect(screen.getByTestId("suggestion-modal")).toBeInTheDocument();
    });

    // Verify suggestion details are displayed
    expect(screen.getByTestId("suggestion-details").textContent).toBe("AI Drink - AI generated drink");
  });

  it("handles suggestion confirmation", async () => {
    render(<HomePage />);

    // Submit AI suggestion to show the modal
    fireEvent.click(screen.getByTestId("submit-ai-suggestion"));
    await waitFor(() => {
      expect(screen.getByTestId("suggestion-modal")).toBeInTheDocument();
    });

    // Confirm the suggestion
    fireEvent.click(screen.getByTestId("confirm-suggestion"));

    // Verify createOrder was called with the correct params
    expect(createOrder).toHaveBeenCalledWith({
      drinkName: "AI Drink",
      ingredients: ["AI ingredient"],
      recipe: "AI recipe",
      guestName: "Test Guest",
    });

    // Wait for order result to be displayed
    await waitFor(() => {
      expect(screen.getByTestId("order-modal")).toBeInTheDocument();
      expect(screen.getByTestId("order-details").textContent).toBe("Test Order Drink - Test Guest");
    });

    // Verify suggestion modal is closed
    expect(screen.queryByTestId("suggestion-modal")).not.toBeInTheDocument();
  });

  it("handles drink selection from the list", async () => {
    render(<HomePage />);

    // Select a drink from the list
    fireEvent.click(screen.getByTestId("select-drink"));

    // Verify createOrder was called with the correct params
    expect(createOrder).toHaveBeenCalledWith({
      drinkName: "Test Drink",
      ingredients: ["test ingredient"],
      recipe: "test recipe",
      guestName: "Test Guest",
    });

    // Wait for order result to be displayed
    await waitFor(() => {
      expect(screen.getByTestId("order-modal")).toBeInTheDocument();
    });
  });

  it("handles closing the order confirmation modal", async () => {
    render(<HomePage />);

    // Select a drink to show the order modal
    fireEvent.click(screen.getByTestId("select-drink"));
    await waitFor(() => {
      expect(screen.getByTestId("order-modal")).toBeInTheDocument();
    });

    // Close the order modal
    fireEvent.click(screen.getByTestId("close-order"));

    // Verify modal is closed
    expect(screen.queryByTestId("order-modal")).not.toBeInTheDocument();
  });

  it("handles error when suggesting a drink", async () => {
    // Setup error case
    (suggestDrink as any).mockRejectedValue(new Error("API error"));

    // Spy on console.error
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {
    });

    render(<HomePage />);

    // Submit AI suggestion
    fireEvent.click(screen.getByTestId("submit-ai-suggestion"));

    // Wait for error to be logged
    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalled();
    });

    // Verify loading state returns to false
    expect(screen.getByTestId("loading-state").textContent).toBe("Not Loading");

    // Verify suggestion modal is not shown
    expect(screen.queryByTestId("suggestion-modal")).not.toBeInTheDocument();

    // Restore console.error
    consoleSpy.mockRestore();
  });

  it("handles error when creating an order", async () => {
    // Setup error case
    (createOrder as any).mockRejectedValue(new Error("API error"));

    // Spy on console.error
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {
    });

    render(<HomePage />);

    // Select a drink to create an order
    fireEvent.click(screen.getByTestId("select-drink"));

    // Wait for error to be logged
    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalled();
    });

    // Verify order modal is not shown
    expect(screen.queryByTestId("order-modal")).not.toBeInTheDocument();

    // Restore console.error
    consoleSpy.mockRestore();
  });

  it("does not call API when guest name is empty", async () => {
    // Dostęp do mocka komponentu
    const mockAISuggestionPanel = vi.mocked(AISuggestionPanel);

    // Nadpisanie implementacji mocka dla tego testu
    mockAISuggestionPanel.mockImplementation(({ onSubmit }) => (
      <div data-testid="ai-suggestion-panel">
        <button
          data-testid="submit-empty-guest"
          onClick={() => onSubmit("Test preferences", "")}
        >
          Submit Empty
        </button>
      </div>
    ));

    render(<HomePage />);

    // Submit with empty guest name
    fireEvent.click(screen.getByTestId("submit-empty-guest"));

    // Verify API was not called
    expect(suggestDrink).not.toHaveBeenCalled();
  });
}); 
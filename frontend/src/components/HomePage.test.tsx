import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import HomePage from "./HomePage.tsx";
import { createOrder, suggestDrink } from "../lib/api.ts";
import AISuggestionPanel from "./AISuggestionPanel.tsx";
import DrinksList from "./DrinksList.tsx";
import SuggestionResultModal from "./SuggestionResultModal.tsx";
import OrderConfirmationModal from "./OrderConfirmationModal.tsx";

// Mock the API functions
vi.mock("../lib/api.ts", () => ({
  suggestDrink: vi.fn(),
  createOrder: vi.fn(),
}));

// Mock the child components to simplify testing
vi.mock("./DrinksList.tsx", () => ({
  default: vi.fn(() => (
    <div data-testid="drinks-list">
      <button data-testid="select-drink">Select Drink</button>
    </div>
  )),
}));

vi.mock("./AISuggestionPanel.tsx", () => ({
  default: vi.fn(() => (
    <div data-testid="ai-suggestion-panel">
      <span data-testid="loading-state">Not Loading</span>
      <button data-testid="submit-ai-suggestion">Submit</button>
    </div>
  )),
}));

vi.mock("./SuggestionResultModal.tsx", () => ({
  default: vi.fn(({ isOpen, onConfirm, onCancel }) =>
    isOpen ? (
      <div data-testid="suggestion-modal">
        <div data-testid="suggestion-details">AI Drink - AI generated drink</div>
        <button data-testid="confirm-suggestion" onClick={() => {
          onConfirm({ /* mock data */ }, "Test Guest");
        }}>
          Confirm
        </button>
        <button data-testid="cancel-suggestion" onClick={() => {
          onCancel();
        }}>
          Cancel
        </button>
      </div>
    ) : null,
  ),
}));

vi.mock("./OrderConfirmationModal.tsx", () => ({
  default: vi.fn(({ isOpen, onClose }) =>
    isOpen ? (
      <div data-testid="order-modal">
        <div data-testid="order-details">Test Order Drink - Test Guest</div>
        <button data-testid="close-order" onClick={() => {
          onClose();
        }}>
          Close
        </button>
      </div>
    ) : null,
  ),
}));

// Get properly typed mocked functions
const mockedSuggestDrink = vi.mocked(suggestDrink);
const mockedCreateOrder = vi.mocked(createOrder);
const mockedDrinksList = vi.mocked(DrinksList);
const mockedAISuggestionPanel = vi.mocked(AISuggestionPanel);
const mockedSuggestionResultModal = vi.mocked(SuggestionResultModal);
const mockedOrderConfirmationModal = vi.mocked(OrderConfirmationModal);

describe("HomePage", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // Setup mock API functions
    mockedSuggestDrink.mockResolvedValue({
      name: "AI Drink",
      description: "AI generated drink",
      ingredients: ["AI ingredient"],
      recipe: "AI recipe",
    });

    mockedCreateOrder.mockResolvedValue({
      id: 123,
      drinkName: "Test Order Drink",
      guestName: "Test Guest",
      status: "PENDING",
      createdAt: new Date().toISOString(),
    });

    // Setup component implementations
    mockedDrinksList.mockImplementation(({ onSelect }) => (
      <div data-testid="drinks-list">
        <button
          data-testid="select-drink"
          onClick={() =>
            onSelect(
              {
                id: 1,
                name: "Test Drink",
                ingredients: ["test ingredient"],
                recipe: "test recipe",
              },
              "Test Guest",
            )
          }
        >
          Select Drink
        </button>
      </div>
    ));

    mockedAISuggestionPanel.mockImplementation(({ onSubmit, isLoading }) => (
      <div data-testid="ai-suggestion-panel">
        <span data-testid="loading-state">{isLoading ? "Loading" : "Not Loading"}</span>
        <button data-testid="submit-ai-suggestion" onClick={() => onSubmit("Test preferences", "Test Guest")}>
          Submit
        </button>
      </div>
    ));

    mockedSuggestionResultModal.mockImplementation(({ suggestion, isOpen, onConfirm, onCancel }) =>
      isOpen ? (
        <div data-testid="suggestion-modal">
          <div data-testid="suggestion-details">
            {suggestion?.name} - {suggestion?.description}
          </div>
          <button data-testid="confirm-suggestion" onClick={() => onConfirm(suggestion, "Test Guest")}>
            Confirm
          </button>
          <button data-testid="cancel-suggestion" onClick={onCancel}>
            Cancel
          </button>
        </div>
      ) : null,
    );

    mockedOrderConfirmationModal.mockImplementation(({ order, isOpen, onClose }) =>
      isOpen ? (
        <div data-testid="order-modal">
          <div data-testid="order-details">
            {order?.drinkName} - {order?.guestName}
          </div>
          <button data-testid="close-order" onClick={onClose}>
            Close
          </button>
        </div>
      ) : null,
    );
  });

  it("renders the component with initial state", () => {
    render(<HomePage />);

    expect(screen.getByTestId("ai-suggestion-panel")).toBeInTheDocument();
    expect(screen.getByTestId("drinks-list")).toBeInTheDocument();
    expect(screen.queryByTestId("suggestion-modal")).not.toBeInTheDocument();
    expect(screen.queryByTestId("order-modal")).not.toBeInTheDocument();
  });

  it("handles AI suggestion submission", async () => {
    render(<HomePage />);

    // Submit AI suggestion
    fireEvent.click(screen.getByTestId("submit-ai-suggestion"));

    // Verify API was called with correct params
    expect(mockedSuggestDrink).toHaveBeenCalledWith({ preferences: "Test preferences" });

    // Wait for suggestion to be processed
    await waitFor(() => {
      expect(screen.getByTestId("suggestion-modal")).toBeInTheDocument();
    });
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
    expect(mockedCreateOrder).toHaveBeenCalledWith({
      drinkName: "AI Drink",
      ingredients: ["AI ingredient"],
      recipe: "AI recipe",
      guestName: "Test Guest",
    });

    // Wait for order result to be displayed
    await waitFor(() => {
      expect(screen.getByTestId("order-modal")).toBeInTheDocument();
    });
  });

  it("handles drink selection from the list", async () => {
    render(<HomePage />);

    // Select a drink from the list
    fireEvent.click(screen.getByTestId("select-drink"));

    // Verify createOrder was called with the correct params
    expect(mockedCreateOrder).toHaveBeenCalledWith({
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
    // Setup error case for this test only
    mockedSuggestDrink.mockRejectedValueOnce(new Error("API error"));

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

    // Verify suggestion modal is not shown
    expect(screen.queryByTestId("suggestion-modal")).not.toBeInTheDocument();

    // Restore console.error
    consoleSpy.mockRestore();
  });

  it("handles error when creating an order", async () => {
    // Setup error case for this test only
    mockedCreateOrder.mockRejectedValueOnce(new Error("API error"));

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

  it("handles suggestion cancellation", async () => {
    render(<HomePage />);

    // Submit AI suggestion to show the modal
    fireEvent.click(screen.getByTestId("submit-ai-suggestion"));

    await waitFor(() => {
      expect(screen.getByTestId("suggestion-modal")).toBeInTheDocument();
    });

    // Cancel the suggestion
    fireEvent.click(screen.getByTestId("cancel-suggestion"));

    // Verify modal is closed
    expect(screen.queryByTestId("suggestion-modal")).not.toBeInTheDocument();
  });
});

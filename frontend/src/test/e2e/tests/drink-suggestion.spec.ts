import { expect, test } from "@playwright/test";
import { HomePage } from "../page-objects/HomePage";
import { SuggestionResultModal } from "../page-objects/SuggestionResultModal";
import { OrderConfirmationModal } from "../page-objects/OrderConfirmationModal";

test.describe("Generowanie propozycji drinka", () => {
  test("powinno wygenerować propozycję drinka po podaniu preferencji i imienia", async ({ page }) => {
    // Arrange
    const homePage = new HomePage(page);
    const suggestionModal = new SuggestionResultModal(page);

    await homePage.goto();

    const preferences = "Lubię drinki owocowe, słodkie, z tequilą";
    const guestName = "Jan Kowalski";

    // Act
    await homePage.generateDrinkSuggestion(preferences, guestName);

    // Assert
    // Sprawdź czy podczas generowania widoczny jest wskaźnik ładowania
    expect(await homePage.isLoadingIndicatorVisible()).toBeTruthy();

    // Poczekaj aż modal z propozycją się pojawi (może zająć trochę czasu)
    await page.waitForSelector("[data-testid='suggestion-result-modal']", { state: "visible", timeout: 10000 });

    // Sprawdź czy modal z propozycją jest widoczny
    expect(await suggestionModal.isVisible()).toBeTruthy();

    // Sprawdź czy wygenerowana propozycja ma wszystkie wymagane elementy
    const drinkName = await suggestionModal.getDrinkName();
    const ingredients = await suggestionModal.getIngredients();
    const recipe = await suggestionModal.getRecipe();

    expect(drinkName).not.toBeNull();
    expect(ingredients).not.toBeNull();
    expect(recipe).not.toBeNull();
  });

  test("powinno zamówić zaproponowany drink", async ({ page }) => {
    // Arrange
    const homePage = new HomePage(page);
    const suggestionModal = new SuggestionResultModal(page);
    const orderModal = new OrderConfirmationModal(page);

    await homePage.goto();

    const preferences = "Lubię drinki owocowe, słodkie, z rumem";
    const guestName = "Anna Nowak";

    // Act
    await homePage.generateDrinkSuggestion(preferences, guestName);

    // Poczekaj aż modal z propozycją się pojawi
    await page.waitForSelector("[data-testid='suggestion-result-modal']", { state: "visible", timeout: 10000 });

    // Zamów drink
    await suggestionModal.confirmOrder();

    // Poczekaj aż modal potwierdzenia zamówienia się pojawi (dodanie dłuższego czasu oczekiwania)
    await page.waitForSelector("[data-testid='order-confirmation-modal']", { state: "visible", timeout: 10000 });

    // Assert
    // Sprawdź czy modal potwierdzenia zamówienia jest widoczny
    expect(await orderModal.isVisible()).toBeTruthy();

    // Sprawdź czy modal zawiera imię gościa
    expect(await orderModal.containsGuestName(guestName)).toBeTruthy();

    // Sprawdź czy zamówienie ma numer
    expect(await orderModal.hasOrderNumber()).toBeTruthy();
  });

  test("powinno pokazać błąd przy braku preferencji", async ({ page }) => {
    // Arrange
    const homePage = new HomePage(page);

    await homePage.goto();
    const guestName = "Test User";

    // Act
    await homePage.enterGuestName(guestName);
    await homePage.clickGenerateButton();

    // Assert
    // Sprawdź, czy pojawił się komunikat o błędzie preferencji
    expect(await page.getByTestId("preference-input-error").isVisible()).toBeTruthy();
  });
});

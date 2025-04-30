import { BasePage } from "./BasePage";

/**
 * Page Object Model dla strony głównej aplikacji
 */
export class HomePage extends BasePage {
  /**
   * Nawiguje do strony głównej
   */
  async goto() {
    await this.page.goto("/");
  }

  /**
   * Wprowadza preferencje drinka
   */
  async enterPreferences(preferences: string) {
    await this.fillInput("preference-input", preferences);
  }

  /**
   * Wprowadza imię gościa
   */
  async enterGuestName(name: string) {
    await this.fillInput("guest-name-input", name);
  }

  /**
   * Klika przycisk generowania propozycji drinka
   */
  async clickGenerateButton() {
    await this.clickElement("generate-drink-button");
  }

  /**
   * Sprawdza czy wskaźnik ładowania propozycji jest widoczny
   */
  async isLoadingIndicatorVisible() {
    return await this.isElementVisible("suggestion-loading-indicator");
  }

  /**
   * Sprawdza czy komunikat błędu AI jest widoczny
   */
  async isAIErrorVisible() {
    return await this.isElementVisible("suggestion-error-message");
  }

  /**
   * Pobiera tekst błędu AI
   */
  async getAIErrorText() {
    return await this.getElementText("suggestion-error-message");
  }

  /**
   * Wypełnia formularz propozycji i generuje drinka
   */
  async generateDrinkSuggestion(preferences: string, guestName: string) {
    await this.enterPreferences(preferences);
    await this.enterGuestName(guestName);
    await this.clickGenerateButton();
  }
}

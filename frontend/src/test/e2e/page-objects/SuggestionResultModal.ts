import { BasePage } from "./BasePage";

/**
 * Page Object Model dla modalu z propozycją drinka wygenerowaną przez AI
 */
export class SuggestionResultModal extends BasePage {
  /**
   * Sprawdza czy modal jest widoczny
   */
  async isVisible() {
    return await this.isElementVisible("suggestion-result-modal");
  }

  /**
   * Pobiera nazwę zaproponowanego drinka
   */
  async getDrinkName() {
    return await this.getElementText("suggestion-drink-name");
  }

  /**
   * Pobiera składniki zaproponowanego drinka
   */
  async getIngredients() {
    return await this.getElementText("suggestion-ingredients");
  }

  /**
   * Pobiera przepis na zaproponowanego drinka
   */
  async getRecipe() {
    return await this.getElementText("suggestion-recipe");
  }

  /**
   * Klika przycisk potwierdzenia (zamówienia) drinka
   */
  async confirmOrder() {
    await this.clickElement("order-suggestion-button");
  }

  /**
   * Klika przycisk anulowania propozycji
   */
  async cancel() {
    await this.clickElement("cancel-suggestion-button");
  }
} 
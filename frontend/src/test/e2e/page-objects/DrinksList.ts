import { BasePage } from "./BasePage";

/**
 * Page Object Model dla listy drinków
 */
export class DrinksList extends BasePage {
  /**
   * Sprawdza czy lista drinków jest widoczna
   */
  async isVisible() {
    return await this.isElementVisible("drinks-list");
  }

  /**
   * Pobiera liczbę drinków na liście
   */
  async getDrinksCount() {
    const drinkCards = this.page.locator("[data-testid^='drink-card-']");
    return await drinkCards.count();
  }

  /**
   * Znajduje kartę drinka po nazwie
   */
  async findDrinkCardByName(name: string) {
    return this.page.getByTestId(`drink-card-${name}`);
  }

  /**
   * Klika przycisk zamówienia na karcie drinka o podanej nazwie
   */
  async orderDrink(name: string) {
    const drinkCard = await this.findDrinkCardByName(name);
    await drinkCard.getByTestId("order-drink-button").click();
  }

  /**
   * Pobiera nazwę drinka z karty o podanym indeksie
   */
  async getDrinkNameAt(index: number) {
    const drinkCards = this.page.locator("[data-testid^='drink-card-']");
    const card = drinkCards.nth(index);
    return await card.getByTestId("drink-name").textContent();
  }

  /**
   * Pobiera składniki drinka z karty o podanym indeksie
   */
  async getDrinkIngredientsAt(index: number) {
    const drinkCards = this.page.locator("[data-testid^='drink-card-']");
    const card = drinkCards.nth(index);
    return await card.getByTestId("drink-ingredients").textContent();
  }

  /**
   * Zamawia drinka o podanym indeksie na liście
   */
  async orderDrinkAt(index: number) {
    const drinkCards = this.page.locator("[data-testid^='drink-card-']");
    const card = drinkCards.nth(index);
    await card.getByTestId("order-drink-button").click();
  }
} 
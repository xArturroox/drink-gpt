import type { Page } from "@playwright/test";

/**
 * Bazowa klasa dla wszystkich Page Object Models
 */
export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Sprawdza czy element o podanym testId jest widoczny
   */
  async isElementVisible(testId: string): Promise<boolean> {
    return await this.page.getByTestId(testId).isVisible();
  }

  /**
   * Pobiera tekst elementu o podanym testId
   */
  async getElementText(testId: string): Promise<string | null> {
    return await this.page.getByTestId(testId).textContent();
  }

  /**
   * Klika w element o podanym testId
   */
  async clickElement(testId: string): Promise<void> {
    await this.page.getByTestId(testId).click();
  }

  /**
   * Wypełnia pole o podanym testId
   */
  async fillInput(testId: string, value: string): Promise<void> {
    await this.page.getByTestId(testId).fill(value);
  }

  /**
   * Czeka na widoczność elementu o podanym testId z timeoutem
   */
  async waitForElement(testId: string, timeoutMs = 5000): Promise<void> {
    await this.page.getByTestId(testId).waitFor({ state: "visible", timeout: timeoutMs });
  }
}

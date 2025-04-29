import { BasePage } from "./BasePage";

/**
 * Page Object Model dla modalu potwierdzenia zamówienia
 */
export class OrderConfirmationModal extends BasePage {
  /**
   * Sprawdza czy modal jest widoczny
   */
  async isVisible() {
    return await this.isElementVisible("order-confirmation-modal");
  }

  /**
   * Pobiera szczegóły zamówienia
   */
  async getOrderDetails() {
    return await this.getElementText("order-details");
  }

  /**
   * Zamyka modal potwierdzenia zamówienia
   */
  async close() {
    await this.clickElement("close-order-button");
  }

  /**
   * Sprawdza czy modal potwierdzenia zawiera imię gościa
   */
  async containsGuestName(name: string) {
    const details = await this.getOrderDetails();
    return details?.includes(name) || false;
  }

  /**
   * Sprawdza czy modal zawiera numer zamówienia
   */
  async hasOrderNumber() {
    const details = await this.getOrderDetails();
    // Sprawdza czy w tekście jest słowo "zamówienia" i po nim cyfry
    return /zamówienia:.*\d+/i.test(details || "");
  }
} 
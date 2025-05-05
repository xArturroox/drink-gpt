import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import HostOrdersPage from "./HostOrdersPage";
import useOrders from "../../../lib/hooks/useOrders";
import useConfirmationDialog from "../../../lib/hooks/useConfirmationDialog";
import type { FilterOptions, OrderViewModel, Pagination } from "../../../types";

// Mock the hooks
vi.mock("../../../lib/hooks/useOrders");
vi.mock("../../../lib/hooks/useConfirmationDialog");

// Sample data
const mockOrders: OrderViewModel[] = [
  {
    id: "1",
    drinkName: "Mojito",
    ingredients: "Rum, mint, lime",
    recipe: "Mix well",
    guestName: "Guest 1",
    orderTimestamp: "2023-06-15 14:30:00",
    served: false,
  },
  {
    id: "2",
    drinkName: "Margarita",
    ingredients: "Tequila, lime juice",
    recipe: "Shake and serve",
    guestName: "Guest 2",
    orderTimestamp: "2023-06-15 15:15:00",
    served: true,
  },
];

const mockFilters: FilterOptions = {
  status: "pending",
};

const mockPagination: Pagination = {
  page: 1,
  size: 10,
};

describe("HostOrdersPage", () => {
  // Setup mocks for hooks
  const mockServeOrder = vi.fn();
  const mockDeleteOrder = vi.fn();
  const mockSetFilters = vi.fn();
  const mockSetPagination = vi.fn();
  const mockOpenDialog = vi.fn();
  const mockCloseDialog = vi.fn();

  beforeEach(() => {
    // Reset mocks
    vi.resetAllMocks();

    // Setup default mock returns
    vi.mocked(useOrders).mockReturnValue({
      orders: mockOrders,
      filters: mockFilters,
      pagination: mockPagination,
      loading: false,
      error: null,
      serveOrder: mockServeOrder,
      deleteOrder: mockDeleteOrder,
      setFilters: mockSetFilters,
      setPagination: mockSetPagination,
    });

    vi.mocked(useConfirmationDialog).mockReturnValue({
      isOpen: false,
      targetId: null,
      open: mockOpenDialog,
      close: mockCloseDialog,
    });
  });

  // Basic rendering tests
  it("renders the page title", () => {
    render(<HostOrdersPage />);
    expect(screen.getByText("Kolejka Zamówień")).toBeInTheDocument();
  });

  it("renders the orders table", () => {
    render(<HostOrdersPage />);
    expect(screen.getByRole("table")).toBeInTheDocument();
  });

  it("displays loading state", () => {
    vi.mocked(useOrders).mockReturnValue({
      ...vi.mocked(useOrders)(),
      loading: true,
    });
    render(<HostOrdersPage />);
    expect(screen.getByText("Ładowanie zamówień...")).toBeInTheDocument();
  });

  it("displays error message", () => {
    vi.mocked(useOrders).mockReturnValue({
      ...vi.mocked(useOrders)(),
      error: new Error("Test error message"),
    });
    render(<HostOrdersPage />);
    const errorMessages = screen.queryAllByText("Test error message");
    expect(errorMessages.length).toBeGreaterThan(0);
  });

  it("matches snapshot", () => {
    const { container } = render(<HostOrdersPage />);
    expect(container).toMatchInlineSnapshot(`
      <div>
        <main
          class="flex-grow container mx-auto p-4 space-y-8"
        >
          <div
            class="p-4"
          >
            <div
              class="flex items-center justify-between"
            >
              <h1
                class="text-2xl font-semibold mb-4"
              >
                Kolejka Zamówień
              </h1>
              <div
                class="flex items-center gap-4 mb-4"
              >
                <select
                  aria-disabled="false"
                  class="w-full border border-gray-200 p-2 rounded-md bg-white hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors"
                >
                  <option
                    value=""
                  >
                    Wszystkie
                  </option>
                  <option
                    value="pending"
                  >
                    Do obsłużenia
                  </option>
                  <option
                    value="served"
                  >
                    Obsłużone
                  </option>
                </select>
              </div>
            </div>
            <div
              class="bg-white"
            >
              <div
                class="overflow-x-auto"
              >
                <table
                  aria-label="Lista zamówień"
                  class="min-w-full divide-y divide-gray-200"
                >
                  <thead>
                    <tr>
                      <th
                        class="px-4 py-2 text-left"
                        scope="col"
                      >
                        #
                      </th>
                      <th
                        class="px-4 py-2 text-left"
                        scope="col"
                      >
                        Drink
                      </th>
                      <th
                        class="px-4 py-2 text-left"
                        scope="col"
                      >
                        Składniki
                      </th>
                      <th
                        class="px-4 py-2 text-left"
                        scope="col"
                      >
                        Przepis
                      </th>
                      <th
                        class="px-4 py-2 text-left"
                        scope="col"
                      >
                        Gość
                      </th>
                      <th
                        class="px-4 py-2 text-left"
                        scope="col"
                      >
                        Czas
                      </th>
                      <th
                        class="px-4 py-2 text-left"
                        scope="col"
                      >
                        Akcje
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      class="border-b last:border-0"
                    >
                      <td
                        class="px-4 py-2"
                      >
                        1
                      </td>
                      <td
                        class="px-4 py-2"
                      >
                        Mojito
                      </td>
                      <td
                        class="px-4 py-2"
                      >
                        Rum, mint, lime
                      </td>
                      <td
                        class="px-4 py-2"
                      >
                        Mix well
                      </td>
                      <td
                        class="px-4 py-2"
                      >
                        Guest 1
                      </td>
                      <td
                        class="px-4 py-2"
                      >
                        2023-06-15 14:30:00
                      </td>
                      <td
                        class="px-4 py-2 flex flex-col gap-2"
                      >
                        <button
                          class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive shadow-xs h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5 bg-green-600 hover:bg-green-700 text-white"
                          data-slot="button"
                        >
                          Obsłużone
                        </button>
                        <button
                          class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5"
                          data-slot="button"
                        >
                          Usuń
                        </button>
                      </td>
                    </tr>
                    <tr
                      class="border-b last:border-0"
                    >
                      <td
                        class="px-4 py-2"
                      >
                        2
                      </td>
                      <td
                        class="px-4 py-2"
                      >
                        Margarita
                      </td>
                      <td
                        class="px-4 py-2"
                      >
                        Tequila, lime juice
                      </td>
                      <td
                        class="px-4 py-2"
                      >
                        Shake and serve
                      </td>
                      <td
                        class="px-4 py-2"
                      >
                        Guest 2
                      </td>
                      <td
                        class="px-4 py-2"
                      >
                        2023-06-15 15:15:00
                      </td>
                      <td
                        class="px-4 py-2 flex flex-col gap-2"
                      >
                        <button
                          class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5"
                          data-slot="button"
                        >
                          Usuń
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div
              class="flex items-center gap-2 mt-4"
            >
              <button
                aria-label="Poprzednia strona"
                class="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
              >
                <svg
                  class="lucide lucide-arrow-left w-4 h-4"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="m12 19-7-7 7-7"
                  />
                  <path
                    d="M19 12H5"
                  />
                </svg>
              </button>
              <span
                class="px-2"
              >
                2
              </span>
              <button
                aria-label="Następna strona"
                class="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
              >
                <svg
                  class="lucide lucide-arrow-right w-4 h-4"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 12h14"
                  />
                  <path
                    d="m12 5 7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </main>
      </div>
    `);
  });
});

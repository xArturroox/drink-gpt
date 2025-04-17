# REST API Plan

## 1. Resources

- **Ingredient**: Represents the ingredients available for making drinks. Maps to the Ingredients table in the database with fields such as `id`, `name`, and `available`.
- **Drink**: Represents a drink recipe which includes a name, a list of ingredients, and detailed preparation instructions. Maps to the Drinks table. There is a many-to-many relationship between drinks and ingredients.
- **Order**: Represents an order placed by a guest. It includes a unique UUID, reference to a chosen drink, guest information (e.g., name), and a timestamp. Maps to the Orders table.
- **Authentication**: Although not a direct resource stored in the database, host authentication is critical. This is handled via Spring Security and managed through stateless JWT tokens.

## 2. Endpoints

### Ingredients

- **GET /api/ingredients**

  - **Description**: Retrieves a paginated list of all ingredients. Supports filtering by availability and sorting.
  - **Query Parameters**:
    - `page` (optional, default=0)
    - `size` (optional, default=20)
    - `available` (optional, boolean filter)
  - **Response Payload**:
    ```json
    [
      {
        "id": 1,
        "name": "Lime",
        "available": true
      },
      ...
    ]
    ```
  - **Success Codes**: 200 OK

- **POST /api/ingredients**

  - **Description**: Creates a new ingredient.
  - **Request Payload**:
    ```json
    {
      "name": "string",
      "available": true
    }
    ```
  - **Response Payload**: The created ingredient with its `id`.
  - **Success Codes**: 201 Created
  - **Error Codes**: 400 Bad Request

- **GET /api/ingredients/{id}**

  - **Description**: Retrieves details of a specific ingredient by ID.
  - **Success Codes**: 200 OK
  - **Error Codes**: 404 Not Found

- **PATCH /api/ingredients/{id}**

  - **Description**: Updates an existing ingredient.
  - **Request Payload**:
    ```json
    {
      "name": "string",
      "available": true
    }
    ```
  - **Success Codes**: 200 OK
  - **Error Codes**: 400 Bad Request, 404 Not Found

- **DELETE /api/ingredients/{id}**
  - **Description**: Deletes an ingredient by ID.
  - **Success Codes**: 204 No Content
  - **Error Codes**: 404 Not Found

### Drinks

- **GET /api/drinks**

  - **Description**: Retrieves a paginated list of drinks. Can be filtered by available ingredients.
  - **Query Parameters**:
    - `page` (optional, default=0)
    - `size` (optional, default=20)
    - `ingredient` (optional, filter by ingredient name or id)
  - **Response Payload**:
    ```json
    [
      {
        "id": 1,
        "name": "Mojito",
        "ingredients": [DrinkIngredientDTO, DrinkIngredientDTO, DrinkIngredientDTO],
        "recipe": "Muddle mint, add lime, ice, and rum..."
      },
      ...
    ]
    ```
  - **Success Codes**: 200 OK

- **POST /api/drinks**

  - **Description**: Creates a new drink recipe.
  - **Request Payload**:
    ```json
    {
      "name": "string",
      "ingredientIds": [1, 2, 3],
      "recipe": "Detailed preparation instructions"
    }
    ```
  - **Response Payload**: The created drink including its unique ID.
  - **Success Codes**: 201 Created
  - **Error Codes**: 400 Bad Request

- **GET /api/drinks/{id}**

  - **Description**: Retrieves details of a specific drink.
  - **Success Codes**: 200 OK
  - **Error Codes**: 404 Not Found

- **PUT /api/drinks/{id}**

  - **Description**: Updates an existing drink.
  - **Request Payload**:
    ```json
    {
      "name": "string",
      "ingredientIds": [1, 2, 3],
      "recipe": "Updated preparation instructions"
    }
    ```
  - **Success Codes**: 200 OK
  - **Error Codes**: 400 Bad Request, 404 Not Found

- **DELETE /api/drinks/{id}**
  - **Description**: Deletes a drink by ID.
  - **Success Codes**: 204 No Content
  - **Error Codes**: 404 Not Found

### Orders

- **GET /api/orders**

  - **Description**: Retrieves a paginated list of orders. Supports filtering by order status or timestamp.
  - **Query Parameters**:
    - `page` (optional, default=0)
    - `size` (optional, default=20)
    - Additional filters (e.g., order status)
  - **Response Payload**:
    ```json
    [
      {
        "id": "uuid-string",
        "drinkName": "string",
        "ingredients": "string",
        "ingredients": "string",
        "recipe": "John Doe",
        "orderTimestamp": "2023-10-01T12:34:56Z"
      },
      ...
    ]
    ```
  - **Success Codes**: 200 OK

- **POST /api/orders**

  - **Description**: Creates a new order for an existing drink (guest selects a drink).
  - **Request Payload**:
    ```json
    {
      "drinkName": "Mojito",
      "ingredients": "string",
      "recipe": "Add lime..",
      "guestName": "JOE"
    }
    ```
  - **Response Payload**: The created order with its UUID and order details.
  - **Success Codes**: 201 Created
  - **Error Codes**: 400 Bad Request, 404 Not Found

- **PATCH /api/orders/{orderId}/served**
  - **Description**: Mark order as served. This is restricted to authenticated hosts.
  - **Success Codes**: 200 No Content
  - **Error Codes**: 404 Not Found

- **DELETE /api/orders/{orderId}**
  - **Description**: Deletes an order from the order queue (after the drink is prepared). This is restricted to authenticated hosts.
  - **Success Codes**: 204 No Content
  - **Error Codes**: 404 Not Found

### AI-Driven Drink Suggestion

- **POST /api/ai/suggestion**
  - **Description**: Processes guest preferences to generate a drink recommendation using AI. The backend integrates with Spring AI to evaluate the current list of available ingredients and provide a drink proposal.
  - **Request Payload**:
    ```json
    {
      "preferences": "Guest's description or mood"
    }
    ```
  - **Response Payload**:
    ```json
    {
      "suggestedDrink": {
        "name": "string",
        "description" "string",
        "ingredients": "string",
        "recipe": "Detailed recipe generated by AI"
      }
    }
    ```
  - **Success Codes**: 200 OK
  - **Error Codes**: 400 Bad Request, 500 Internal Server Error (for AI integration issues)

## 3. Validation and Business Logic

### Validation

- **Ingredient**:

  - `name` must not be empty and should be unique if enforced by the DB schema.
  - `available` must be a boolean.

- **Drink**:

  - `name` must be provided.
  - Must include at least one valid ingredient (validated via `ingredientIds`).
  - `recipe` must not be empty.


### Business Logic

- **Authentication**:

  - Host login is managed by Spring Security. Only authenticated hosts can perform mutations (create, update, delete) on ingredients, drinks, and orders.

- **Order Management**:

  - Orders are added to the order queue with a unique UUID. Hosts can delete orders once the corresponding drink has been prepared.
  - The system ensures that orders for non-existent drinks are rejected (404 Not Found) and validates the existence of ingredients when creating or updating drinks.

- **AI Integration**:

  - The AI-driven endpoint (/api/ai/suggestion) receives guest preferences and leverages Spring AI to generate a drink recommendation based on current ingredient availability.
  - The recommendation includes a drink name, short description, list of ingredient, and a detailed recipe. There is an implicit validation that the recommended drink uses only available ingredients.

- **Pagination, Filtering, and Sorting**:
  - List endpoints for ingredients, drinks, and orders support pagination and may include query parameters for filtering and sorting.
  - This helps in scaling and performance by limiting the result set per request.

### Security and Performance

- **Security**:

  - All modification endpoints (POST, PUT, DELETE) require valid authentication tokens. Public endpoints like login and AI suggestions have proper input validation and may be rate limited.
  - Use of JWT tokens in the `Authorization` header ensures secure stateless sessions.



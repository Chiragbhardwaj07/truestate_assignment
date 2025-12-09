# Retail Sales Backend

This is the backend service for the Retail Sales Management System, built with **Node.js**, **Apollo Server**, and **Prisma**. It exposes a GraphQL API to manage and query sales data.

## Tech Stack
-   **Runtime**: Node.js
-   **API**: GraphQL (Apollo Server)
-   **Database ORM**: Prisma
-   **Database**: PostgreSQL

## Prerequisites
-   Node.js (v18+)
-   PostgreSQL Database URL

## Setup

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Environment Configuration**:
    Create a `.env` file in this directory:
    ```env
    DATABASE_URL="postgresql://user:password@localhost:5432/your_db_name?schema=public"
    PORT=4000
    ```

3.  **Database Setup**:
    Generate the Prisma client:
    ```bash
    npx prisma generate
    ```
    (Optional) If setting up a new DB from schema:
    ```bash
    npx prisma migrate dev --name init
    ```

## Running the Server

-   **Start Server**:
    ```bash
    npm start
    // or
    node src/index.js
    ```
    The server will start at `http://localhost:4000/`.

## GraphQL API

The API endpoint is available at `/` (e.g., `http://localhost:4000/`).

### Key Queries
-   `getSales(search, filters, sort, page, limit)`: Fetch paginated sales data with filtering and sorting.
-   `getRegions`, `getGenders`: Fetch unique values for UI filters.

### Key Types
-   `SalesTransaction`: Represents a single sale record.
-   `SalesResponse`: Includes `data` array and aggregation metrics (`total`, `totalAmount`, `totalUnits`, `totalDiscount`).

## Folder Structure
-   `src/index.js`: Entry point, server setup.
-   `src/typeDefs.js`: GraphQL Schema definitions.
-   `src/resolvers.js`: Request handling logic.
-   `prisma/schema.prisma`: Database model definition.

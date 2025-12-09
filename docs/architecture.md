# Architecture Document

## Overview
The Retail Sales Management System is a web application designed to manage and visualize sales data. It features advanced search, multi-select filtering, sorting, and pagination.

## Architecture
The application follows a standard Client-Server architecture.

### Backend
- **Framework**: Node.js with Apollo Server.
- **Database**: PostgreSQL (provided via Supabase).
- **ORM**: Prisma (for type-safe database access).
- **API**: GraphQL (Schema-First approach initially, then aligned with Resolvers).
- **Responsibilities**:
    - Manage connection to the database.
    - Resolve GraphQL queries for `sales` and `filters`.
    - Handle search logic (partial matching) and complex filtering (OR/AND logic).

### Frontend
- **Framework**: React (Vite).
- **State/Data**: Apollo Client (caching and request management) + Local State (Search, Filter, Sort inputs).
- **UI Components**:
    - `App.js`: Main layout and state container.
    - `FilterPanel`: Renders dynamic checkbox lists and ranges.
    - `SalesTable`: Displays tabular data.
    - `SortDropdown` & `Pagination`: User controls.
- **Styling**: Vanilla CSS (CSS Variables for theme).

### Data Flow
1. User interacts with UI (types in Search, clicks Filter).
2. React State updates (`search`, `filters`).
3. Apollo Client triggers `GetSales` query with variables.
4. Backend Resolver receives query.
5. Prisma constructs SQL query (`WHERE`, `ORDER BY`, `LIMIT`, `OFFSET`).
6. Database returns rows.
7. Backend returns GraphQL response.
8. Frontend rerenders `SalesTable`.

## Folder Structure
- `backend/`: Server code.
  - `src/index.js`: Entry point.
  - `src/resolvers.js`: Query logic.
  - `src/typeDefs.js`: GraphQL Schema.
  - `prisma/`: Schema and Client.
- `frontend/`: Client code.
  - `src/Components/`: reusable UI.
  - `src/App.jsx`: Main page.
  - `src/queries.js`: GraphQL queries.

## Design Decisions
- **GraphQL**: Chosen for flexibility in querying only needed fields and handling nested/complex filter types efficiently.
- **Prisma**: Simplifies DB operations and provides safety.
- **Vanilla CSS**: Kept dependencies low and met requirement for "Clean" approach.

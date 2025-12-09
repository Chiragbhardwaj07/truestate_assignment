# Retail Sales Management System

## Overview
A full-stack Retail Sales Management System with advanced Search, Filtering, Sorting, and Pagination. Built with React, Node.js, GraphQL, and Prisma.

## Tech Stack
- **Frontend**: React, Vite, Apollo Client, Vanilla CSS.
- **Backend**: Node.js, Apollo Server, Prisma, PostgreSQL.
- **Database**: PostgreSQL (Supabase).

## Features
- **Search**: Full-text search on Customer Name and Phone Number.
- **Filtering**: Multi-select filters for Region, Gender, Category, Tags, Payment Method. Age text range.
- **Sorting**: Sort by Date, Quantity, Customer Name (Asc/Desc).
- **Pagination**: Server-side pagination.

## Setup Instructions

### Backend
1. Navigate to backend: `cd backend`
2. Install dependencies: `npm install`
3. Generate Prisma Client: `npx prisma generate`
4. Start Server: `npm start` (or `node src/index.js`)
   - Server runs on http://localhost:4000

### Frontend
1. Navigate to frontend: `cd frontend`
2. Install dependencies: `npm install`
3. Start Dev Server: `npm run dev`
   - App runs on http://localhost:5173

## Implementation Summaries
- **Search**: GraphQL query with `OR` condition on name/phone in Prisma `where` clause.
- **Filters**: Helper queries fetch available options. Frontend constructs a `FilterInput` object passed to backend. Backend dynamically builds Prisma `where` clause.
- **Sorting**: `SortInput` enum controls `orderBy` array in Prisma.
- **Pagination**: `skip` and `take` variables in Prisma based on `page` and `limit`.

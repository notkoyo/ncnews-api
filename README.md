# NC News API

## Hosted Version

The hosted version of the API can be accessed at [https://nc-news-api-8ppx.onrender.com](https://nc-news-api-8ppx.onrender.com)

## Project Summary

This project aims to build an API that allows programmatically accessing application data. The API is built on a PostgreSQL database and interacts with it using node-postgres.

## Getting Started

### Prerequisites

Make sure you have the following software installed:

- [Node.js](https://nodejs.org/) (minimum version: 20.10.0)
- [PostgreSQL](https://www.postgresql.org/) (minimum version: 16.1)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/notkoyo/ncnews-api.git
   ```

2. **Install dependencies:**

   ```bash
   cd ncnews-api

   npm install
   ```

### Database Seeding

To create and seed the local database with initial data, run the following commands:

   ```bash
   npm run setup-dbs
   npm run seed
   ```

### Running Tests

To execute tests, use the following command:

```bash
npm test endpoint
```

### Environment Variables

Create two separate .env files for different environments, as described below:

**.env.development**:

This file is used for the development environment and should include the following variable:

```
PGDATABASE = nc_news
```

**.env.test**:

This file is used for the development environment and should include the following variable:

```
PGDATABASE = nc_news_test
```


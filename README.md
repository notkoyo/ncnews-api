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
   git clone https://github.com/your-username/your-repo.git

Create files: .env.test containing PGDATABASE=nc_news_test && .env.development containing PGDATABASE=nc_news
in order to succesfully connect locally to the databases used in this project.
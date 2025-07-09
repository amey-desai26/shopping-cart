# Shopping Cart

A modern, responsive e-commerce web application built with Angular and Angular Material. This app allows users to browse a list of products, search and sort by name or price, and add items to a shopping cart. The cart supports quantity adjustments, item removal, and displays a running subtotal. The UI features a persistent header with a live cart badge and search bar, and all data is fetched from a Node.js/Express backend via RESTful APIs.

Key features:

- Product grid with images, prices, and add-to-cart functionality
- Real-time search and sort (by name or price)
- Shopping cart with quantity controls and item removal
- Responsive design with Angular Material components
- Persistent cart badge and search in the header
- Backend integration for product and cart management

## Prerequisites

- Node.js (v16+ recommended)
- npm (v8+ recommended)
- Angular CLI (v16+ recommended):
- Install globally if not already:
  npm install -g @angular/cli

1. Clone the Repository
   If you haven't already, clone your project repository:

```bash
   git clone https://github.com/amey-d2611/e-shopping-frontend
   cd shopping-cart
```

2. Install Dependencies
   Install all required npm packages:

```bash
   npm install
```

3. Configure Environment
   Check or update src/environments/environment.ts for your backend API URL:

```bash
   export const environment = {
   production: false,
   apiUrl: 'http://localhost:3000', // Local backend URL
   };
```

Note: Adjust the apiUrl if your backend runs on a different host/port.

4. Run the Angular App

## Development server

To start a local development server, run:

```bash
npm start
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Building

To build the project run:

```bash
npm run build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

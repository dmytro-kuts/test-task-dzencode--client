### Test Task Dzencode
Test Task Dzencode is a React web application that demonstrates the implementation of various features using Redux for state management and React Router for navigation. The project showcases a user interface for managing orders and products.

# Table of Contents
- Features
- Installation
- Usage
- Technologies Used
- Folder Structure
- Contributing

# Features
Orders Management: View, select, and delete orders. Each order shows the number of associated products and total prices in USD and UAH.

Products Management: Browse a list of products, including details like title, serial number, type, guarantee period, price, order, and creation date.

Real-time Active Sessions: The application's top menu displays the current date, time, and a counter indicating the number of active user sessions.

Responsive Design: The application is designed to work smoothly on various screen sizes, adapting to desktop and mobile devices.

Installation

## Installation

1. Clone the repository to your local machine:
   
   - git clone https://github.com/your-username/test-task-dzencode.git

2. Navigate to the project directory:

  - cd test-task-dzencode

3. Install the required dependencies:

 - npm install

## Usage

1. Start the development server:

  - npm start

2. Open your web browser and navigate to http://localhost:3000 to view the application.

## Features
Integrates Redux for state management.
Uses Axios for making HTTP requests to APIs.
Demonstrates usage of React Router for routing.
Displays orders and products with details.


# Technologies Used
- React
- Redux (Redux Toolkit)
- React Router
- Axios
- Sass
- react-i18next
- TypeScript

# Folder Structure
The project's directory structure is organized as follows:

- |-- node_modules
- |-- public
- |-- src/
-     |-- api/
-     |   |-- axios.ts
-     |-- assets/
-     |   |-- img/
-     |       |-- icons/
-     |       |-- products/
-     |       |-- user/
-     |       |-- logo.png
-     |-- components/
-     |   |-- UI/
-     |       |-- buttons/
-     |           |-- ButtonAdd.tsx
-     |           |-- ButtonClose.tsx
-     |           |-- ButtonDelete.tsx
-     |           |-- ButtonInherit.tsx
-     |           |-- ButtonList.tsx
-     |           |-- ButtonRemove.tsx
-     |           |-- index.ts
-     |       |-- LanguageSelector.tsx
-     |       |-- Popup.tsx
-     |       |-- Preloader.tsx
-     |   |-- NavigationMenu.tsx
-     |   |-- Orders.tsx
-     |   |-- Products.tsx
-     |   |-- TopMenu.tsx
-     |-- hooks/
-     |   |-- useDateFormat.ts
-     |   |-- useTotalPriceCalculator.ts
-     |-- layouts/
-     |   |-- MainLayout.tsx
-     |-- pages/
-     |   |-- OrdersPage.tsx
-     |   |-- ProductsPage.tsx
-     |-- redux/
-     |   |-- activeSessions/
-     |       |-- activeSessionsSlice.ts
-     |   |-- orders/
-     |       |-- ordersSlice.ts
-     |   |-- products/
-     |       |-- productsSlice.ts
-     |   |-- store.ts
-     |-- scss/
-     |   |-- base/
-     |   |-- components/
-     |   |-- pages/
-     |   |-- global.scss
-     |   |-- index.scss
-     |-- App.tsx
-     |-- i18n.ts
-     |-- index.tsx
-     |-- .env
-     |-- .gitignore
-     |-- DatabaseSchema.txt
-     |-- package-lock.json
-     |-- package.json
-     |-- README.md



# Fork the repository.
Create a new branch for your feature/bugfix: git checkout -b feature-name.
Make your changes and commit them: git commit -m "Add feature".
Push the changes to your fork: git push origin feature-name.
Create a pull request in the original repository.
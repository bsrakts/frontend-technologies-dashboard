# Frontend Technologies Dashboard

This project is a Frontend Technologies Dashboard created using Next.js, React, Redux Toolkit, and Supabase. The dashboard displays various frontend technologies categorized with their weekly download counts, release dates, and URLs. It also provides data visualizations using ApexCharts.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Dependencies](#dependencies)
- [Features](#features)
- [Components](#components)
- [State Management](#state-management)
- [Testing](#testing)

## Installation

Clone the repository and install the dependencies.

```sh
git clone https://github.com/your-repo/frontend-tech.git
cd frontend-tech
npm install
```

## USAGE

To run the development server:

```sh
npm run dev
```

To build the project:

```sh
npm run build
```

To start the production server:

```sh
npm start
```

## Project Structure

frontend-tech/
├── public/
├── src/
│ ├── app/
│ ├── components/
│ │ ├── common/
│ │ ├── features/
│ ├── pages/
│ ├── services/
│ ├── store/
│ ├── styles/
├── node_modules/
├── package.json
├── README.md
├── tsconfig.json
└── .eslintrc.json

Dependencies
The project uses the following main dependencies:

next: The Next.js framework for server-side rendering and static site generation.
react: A JavaScript library for building user interfaces.
react-dom: Serves as the entry point to the DOM and server renderers for React.
@reduxjs/toolkit: The official, opinionated, batteries-included toolset for efficient Redux development.
@supabase/supabase-js: A JavaScript client library for Supabase.
apexcharts: A modern charting library that helps developers to create interactive visualizations.
react-apexcharts: The official React wrapper for ApexCharts.
axios: A promise-based HTTP client for the browser and Node.js.
Dev dependencies include:

typescript: A strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.
tailwindcss: A utility-first CSS framework for rapid UI development.
postcss: A tool for transforming CSS with JavaScript plugins.
Features
Dynamic Sidebar: Displays categories and allows navigation.
Responsive Design: Ensures compatibility across devices.
Charts and Tables: Visualizes data with ApexCharts and displays it in tables with Material-UI.
Filtering and Sorting: Allows users to filter and sort the data.
Data Fetching: Uses Supabase for fetching data and displaying it dynamically.
Components
Navbar
The Navbar component provides navigation links to the charts and tables view.

Sidebar
The Sidebar component displays categories dynamically fetched from the Supabase database. It includes a hamburger menu for responsive design.

Tables
The Tables component displays the data in a table format, with pagination, sorting, and filtering functionalities.

Charts
The Charts component visualizes data using ApexCharts. It provides both bar and donut charts to display the top technologies based on weekly downloads.

State Management
The project uses Redux Toolkit for state management. The next-redux-wrapper is used to integrate Redux with Next.js, ensuring seamless server-side rendering.

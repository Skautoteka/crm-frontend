## CRM Skautoteka - Frontend Angular

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Starting the Development Server](#starting-the-development-server)
- [Building the Project for Production](#building-the-project-for-production)
- [Utils Scripts](#utils-scripts)

## Introduction

**Skautoteka** is a modern web application built using the **NX monorepo** architecture. The project is designed to facilitate scalable and maintainable development by structuring the codebase into apps and libraries.

### Project Structure

- **Apps**

  - `skautoteka-frontend`: The primary application, serving as the main project.
  - `skautoteka-frontend-e2e`: An end-to-end testing application to ensure reliability and quality.

- **Libraries**
  - `ui`: A library of reusable, "dumb" UI components designed to provide consistency and ease of use throughout the project. Examples include buttons, forms, and layout components.
  - `common`: A utility library containing shared services and components that provide core functionalities. Examples include:
    - **`ClassBinder`**: A service for dynamic class management.
    - **`DeviceService`**: A utility to determine the type of device accessing the application.

## Prerequisites

Ensure you have the following installed on your system before proceeding:

- [Node.js](https://nodejs.org/) (version 18.0 or later)
- [Package Manager (e.g., npm)](https://www.npmjs.com/get-npm)
- [Nx - Monorepo Tool (install from npm globally)](https://nx.dev)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/Skautoteka/crm-frontend.git
   ```
2. Navigate to project directory

```
cd crm-frontend
```

3. Install all project dependencies

```
npm install
```

## Starting the Development Server

To start the development server you need to run the following command inside your command line terminal. Please make sure you are inside the root of the project.

```
npm start
```

When the compiling is done the application should be served locally on port 4200. If the port has already been taken locally by some other running process the application will ask you for permission to start the server on another port that is currently available.

## Building the Project for Production

As previously mentioned, the project uses Nx Monorepo tool. This also allows to build and orchestrate the deployment process. Each project can be built and the build can be configured inside `project.json` files (https://nx.dev/reference/project-configuration). In order to build the project you need to run

```
nx build skautoteka-frontend
```

When the build is finished the output files can be found inside `dist/skautoteka-frontend/browser` folder. All the compiled files are static files that should be served from the server (e.g. using nginx)

## Utils Scripts

#### Prettier

There are also some helper scripts to make the work with the project a little bit easier. The first command helps you format the code using `prettier`. In order to format the project go ahead and run

```
npm run prettier
```

#### Lint

There is also linting configured that helps you check and potentially fix files for linting rules. To run lint please run the following command

```
npm run lint
```

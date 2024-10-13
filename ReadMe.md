# Home Assignment: Title Management

## Overview

A frontend application that interacts with an Express backend to manage user authentication and create and read (display) titles suggested by users. Additionally, integrate MetaMask for wallet functionality.

## Features

- **User Authentication**: Users can register and log in using JWT for session management.
- **Title Management**: Authenticated users can view, add, and delete titles.
- **MetaMask Integration**: Users can connect their cryptocurrency wallet to add or delete titles.
- **Unit Testing**: Comprehensive tests for key functionalities.

## Tech Stack

- **Frontend Framework**: React
- **State Management**: -----
- **Styling**: Tailwind CSS
- **Testing**: Jest, React Testing Library
- **MetaMask**: @metamask/detect-provider

## Installation

Follow these steps to set up the project locally:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Bakhtiar85/hiring-task.git
   cd hiring-task
   git checkout bakhtiar85/frontend
   ```

2. **Setup backend**:
   Follow https://github.com/Bakhtiar85/hiring-task?tab=readme-ov-file#installation-instructions


3. **Install Frontend dependencies**:
   ```bash
   npm install
   ```

4. **Start the Frontend development server**:
   ```bash
   npm start
   ```

5. **Connect to the backend**:
   Ensure that the Express backend is running on port 8080. 
   Adjust the API endpoint URLs in the frontend if needed.

## Usage

- Navigate to the registration page to create a new account.
- Log in with your credentials.
- Connect your MetaMask wallet to enable title management features.
- You can view, add, and delete titles from the dashboard.

## API Endpoints

### Authentication

- **POST /api/auth/register**: Register a new user.
- **POST /api/auth/login**: Log in an existing user.

### Title Management

- **GET /api/titles**: Retrieve a list of titles.
- **POST /api/titles**: Add a new title (requires wallet connection).
- **DELETE /api/titles/:id**: Delete an existing title (requires wallet connection).

## Frontend Testing

To run the unit tests, use the following command:

```bash
npm test
```

### Note on Testing

Unit tests have been written for the registration, login, and title management functionalities. Some tests related to MetaMask integration and title deletion may have encountered issues and are currently ignored.

## Troubleshooting

- **MetaMask not connecting**: Ensure that the MetaMask extension is installed and you're logged in. Check that your network settings in MetaMask match those required by the application.
- **Backend not responding**: Ensure that the Express backend is running and accessible. Check the API endpoint URLs in your frontend code.

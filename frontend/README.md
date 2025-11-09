# Frontend Application for Full Stack Coding Test

This Vue.js 3 application serves as the frontend for the Full Stack Developer Coding Test. It integrates with two different backend APIs (`backend-todos` and `backend-users`) to provide a complete user experience, covering authentication, profile management, task management, and user discovery.

## Tech Stack

- **Vue.js 3**: A progressive JavaScript framework for building user interfaces.
- **Vue Router**: The official router for Vue.js.
- **Vite**: A modern frontend build tool that provides a faster and leaner development experience.
- **Axios**: A promise-based HTTP client for making requests to the backend APIs.
- **pnpm**: A fast, disk space-efficient package manager.

## Features

This application implements the requirements for **Questions 1, 3, and 4** of the coding test.

### 1. Core Authentication & Profile Management

- **User Registration & Login**: Secure forms for user registration and login.
- **JWT-Based Authentication**: The application stores a JWT in local storage upon login and uses it to authenticate subsequent API requests.
- **Protected Routes**: Navigation guards prevent unauthorized access to protected pages like the Profile and To-Do list.
- **Auto-Saving User Profile**: The `UserProfile` component allows users to update their profile information. Changes are automatically saved with a debounce mechanism to prevent excessive API calls. Visual indicators (`Saving...`, `Saved!`) provide feedback on the save status.

### 2. To-Do List CRUD Functionality

- **Full CRUD Interface**: A dedicated page for managing To-Do items.
- **Add & Display Tasks**: Users can add new tasks, which are instantly displayed in the list.
- **In-Place Editing**: Double-click a task to edit its name directly in the list. Changes are saved automatically.
- **Toggle Completion**: A checkbox allows users to mark tasks as complete or incomplete.
- **Delete Tasks**: Users can remove tasks from their list.

### 3. Random Profile Discovery (Tinder-Style Cards)

- **Dynamic User Fetching**: Connects to the Laravel `backend-users` API to fetch paginated user data.
- **Interactive Card Stack**: Displays user profiles as a stack of cards.
- **Swipe Animation**: Users can "swipe" through profiles. The cards animate smoothly off-screen, and the next card in the stack becomes active.
- **Depth Effect**: The next two cards are visible behind the current one, scaled down and offset to create a sense of depth and progression.
- **Infinite Scrolling**: Automatically fetches the next page of users from the API when the current stack is depleted.

## Project Structure

```
frontend/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── TodoList.vue
│   │   └── UserProfile.vue
│   ├── router/
│   │   └── index.js
│   ├── views/
│   │   ├── Login.vue
│   │   ├── RandomProfile.vue
│   │   ├── Register.vue
│   │   └── Todos.vue
│   ├── App.vue
│   └── main.js
├── .gitignore
├── index.html
├── package.json
├── pnpm-lock.yaml
└── vite.config.js
```

## Installation

1.  **Clone the repository** (if you haven't already):
    ```bash
    git clone <repository-url>
    cd frontend
    ```

2.  **Install dependencies** using `pnpm`:
    ```bash
    pnpm install
    ```

## Running the Application

To start the development server, run the following command:

```bash
pnpm dev
```

The application will be available at `http://localhost:5173`.

**Note**: For full functionality, ensure that both the `backend-todos` and `backend-users` servers are running.
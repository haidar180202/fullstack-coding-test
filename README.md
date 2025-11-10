# Full Stack Developer Coding Test

**Tech Stack:** Vue.js, Node.js, Express.js, Laravel (optional)  
**Duration:** 2.5 hours  
**Format:** Take-home or live technical test  
**Evaluation Areas:** Code quality, structure, understanding of full stack integration, and communication of design decisions.

---

### 🚀 Installation and Running the Application

To get the application running, follow these steps:

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd fullstack-coding-test
    ```

2.  **Build and run the services using Docker Compose:**

    ```bash
    docker-compose up -d --build
    ```

This single command will build the images for all services and start them in detached mode.

3.  **Access the applications:**

    -   **Vue.js Frontend:** [http://localhost:5173](http://localhost:5173)
    -   **Laravel Users API:** [http://localhost:8000/api/users](http://localhost:8000/api/users)
    -   **Node.js Todos API:** [http://localhost:3000/todos](http://localhost:3000/todos)

---

### 📘 Instructions

- You may use any boilerplate or framework CLI tools (e.g., `vue create`, `npx express-generator`, `laravel new`).
- Code clarity and structure matter more than completeness.
- Use comments to explain your reasoning or assumptions.
- If you cannot fully implement a feature, describe how you would do it.

---

### 🧠 Question 1 — Vue.js Component Design (30 points)

**Scenario:**  
You’re building a `UserProfile.vue` component that allows users to edit their profile (name, email, profilePicture). The data should auto-save 2 seconds after the user stops typing.

**Requirements:**
- Use Vue 3 + Composition API
- Debounce the `saveProfile()` API call
- Show a “Saving...” indicator while saving
- Display “Saved!” when completed

---

### ⚙️ Question 2 — Express.js REST API (25 points)

**Scenario:**  
Implement a basic To-Do API with routes for:
- `POST /todos` → create a new todo
- `GET /todos` → list all todos
- `PATCH /todos/:id` → update specific fields
- `DELETE /todos/:id` → delete a todo

Use in-memory storage (no database needed for the test).

---

### 🔐 Question 3 — Full Stack Integration (30 points)

**Scenario:**  
You need to implement login using JWT where:
- The frontend (Vue.js) sends user credentials to backend
- The backend (Express.js) validates and returns a JWT
- The frontend stores token securely and protects routes

---

### 🐘 Question 4 — Laravel API (Nice to Have, 15 points)

**Scenario:**  
Create an endpoint `/api/users` returning paginated users with their posts.

---

### 🧾 Scoring Summary

| Section | Topic | Points | Key Evaluation Focus |
| :--- | :--- | :--- | :--- |
| 1 | Vue.js component | 30 | Composition API, reactivity, UX |
| 2 | Express.js API | 25 | REST design, validation, structure |
| 3 | Full stack JWT auth | 30 | Integration, security, token handling |
| 4 | Laravel API | 15 | Eloquent, relationships, pagination |
| **Total** | | **100** | |
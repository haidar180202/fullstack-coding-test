# Laravel API for Users and Posts

This project is the solution for the **Optional Question 4 — Laravel API** of the Full Stack Developer Coding Test. It provides a simple, paginated REST API to serve user data.

While the original task was to simply provide a paginated list of users with their posts, this API was integrated into the main `frontend` application to power a dynamic user discovery feature.

## Core Features

-   **Endpoint:** A `GET /api/users` endpoint that returns a paginated JSON list of users.
-   **Data Relationship:** Each user object includes their associated posts, demonstrating a one-to-many relationship.
-   **Database:**
    -   `User` and `Post` models with corresponding migrations.
    -   Database seeding for sample data.

## Feature Integration: Random Profile Discovery

This API serves as the data source for the **Random Profile** feature in the Vue.js frontend. Key aspects of this integration include:

-   **Dynamic Data Fetching**: The frontend dynamically fetches batches of users from the `/api/users` endpoint.
-   **Engaging UI**: The user data is displayed in an interactive, Tinder-like card stack animation, allowing users to swipe through profiles.
-   **Seamless Pagination**: The frontend automatically requests the next page of users when the current batch is exhausted, creating an infinite-scrolling experience.

This integration showcases how a simple backend API can power a rich and interactive frontend user experience.

## Getting Started

### Prerequisites

-   PHP >= 8.1
-   Composer
-   Laravel

### Installation

1.  **Clone the repository:**
    ```sh
    git clone <repository-url>
    cd backend-users
    ```

2.  **Install dependencies:**
    ```sh
    composer install
    ```

3.  **Set up environment file:**
    Create a copy of the `.env.example` file and name it `.env`.
    ```sh
    cp .env.example .env
    ```

4.  **Generate application key:**
    ```sh
    php artisan key:generate
    ```

5.  **Configure the database:**
    This project uses SQLite by default. To create the database file, run:
    ```sh
    touch database/database.sqlite
    ```

6.  **Run migrations and seed the database:**
    This will create the necessary tables and populate them with sample data.
    ```sh
    php artisan migrate --seed
    ```

### Running the Application

To start the development server, use the following command:

```sh
php artisan serve
```

The application will be available at `http://127.0.0.1:8000`.

## API Endpoint

### Get Users

-   **GET** `/api/users`

    Retrieves a paginated list of users along with their posts.

    **Example Response:**

    ```json
    {
        "current_page": 1,
        "data": [
            {
                "id": 1,
                "name": "John Doe",
                "email": "john.doe@example.com",
                "posts": [
                    {
                        "id": 1,
                        "user_id": 1,
                        "title": "Post Title 1",
                        "body": "This is the body of post 1."
                    }
                ]
            }
        ],
        "first_page_url": "http://127.0.0.1:8000/api/users?page=1",
        "from": 1,
        "last_page": 2,
        "last_page_url": "http://127.0.0.1:8000/api/users?page=2",
        "next_page_url": "http://127.0.0.1:8000/api/users?page=2",
        "path": "http://127.0.0.1:8000/api/users",
        "per_page": 5,
        "prev_page_url": null,
        "to": 5,
        "total": 10
    }
    ```
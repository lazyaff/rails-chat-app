# Realtime Chatroom with Ruby on Rails, React, and WebSocket

This project is a real-time chatroom application built using Ruby on Rails for the backend, React with Vite for the frontend, and WebSocket for real-time communication.

## Features

-   Real-time messaging using WebSocket (Action Cable)
-   Chat room with multiple users
-   Responsive design for mobile and desktop

## Requirements

-   Ruby (version >= 3.3.2)
-   Rails (version >= 7.1.3.4)
-   Node.js (version >= 21.5.0)
-   Npm (version >= 10.2.5)

## Getting Started

1. **Clone the Repository:**

    ```bash
    git clone <repository-url>
    cd <project-folder>
    ```

2. **Install Dependencies:**

    ```bash
    bundle install
    cd client
    npm install
    ```

3. **Set Up Database:**

    ```bash
    rails db:create
    rails db:migrate
    rails db:seed
    ```

4. **Start the Servers:**

    - **Backend (Ruby on Rails):**

        ```bash
        rails server
        ```

    - **Frontend (React with Vite):**

        ```bash
        cd client
        npm run dev
        ```

5. **Access the Application:**

    Visit `http://localhost:5173` in your web browser to access the chatroom application.

## Technologies Used

-   **Backend:**

    -   Ruby on Rails
    -   SQLite3

-   **Frontend:**
    -   React
    -   Vite (for fast development)
    -   Tailwind CSS (for styling)

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests for any improvements or additional features.

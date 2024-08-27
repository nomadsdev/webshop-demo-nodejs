# Webshop Demo

## Overview

The Webshop Demo is a sample e-commerce application that demonstrates the basic functionalities of an online store. It includes features for user authentication, product management, stock management, and configuration settings. The project is built using Express.js for the server, MySQL for the database, and JWT for authentication.

## Features

- **User Authentication:** Secure user login and registration using JWT and session cookies.
- **Product Management:** Create, update, and delete products.
- **Stock Management:** Manage stock items and link them to user accounts.
- **Configuration Management:** Update and manage application settings.
- **Token Management:** Generate and manage tokens for various purposes.

## Technology Stack

- **Backend:** Express.js
- **Database:** MySQL
- **Authentication:** JWT (JSON Web Tokens)
- **Environment Configuration:** dotenv
- **Dependency Management:** npm

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/nomadsdev/webshop_nodejs.git
    cd webshop-demo
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Create a `.env` file:**

    Create a `.env` file in the root directory and add the following environment variables:

    ```plaintext
    KEY_AUTH=your_jwt_secret_key
    ```

    Replace `your_jwt_secret_key` with a strong secret key used for JWT authentication.

4. **Set up the database:**

    - Create a MySQL database.
    - Import the necessary SQL schema into your database. You can find the SQL schema in the `db` folder or provided documentation.

5. **Start the server:**

    ```bash
    nodemon server
    ```

    The application will start on [http://localhost:3000](http://localhost:3000).

## Endpoints

### Authentication

- `POST /signin`: User login.
- `POST /signup`: User registration.

### Product Management

- `POST /admin/createproducts`: Create a new product.
- `POST /admin/delete/:token`: Delete a product by its token.

### Stock Management

- `POST /admin/managestock`: Create or manage stock items.

### Configuration

- `POST /admin/config`: Update application configuration.

### Token Management

- `POST /generatecode`: Generate a new token code.
- `POST /fillcode`: Fill in a token code to apply it.

## Middleware

- **Authentication Middleware:** Checks for valid JWT tokens and user authentication.
- **Configuration Middleware:** Loads configuration settings from the database.

## License

This project is licensed under the MIT License

## Contact

For any questions or suggestions, please contact your email support@jmmentertainment.com

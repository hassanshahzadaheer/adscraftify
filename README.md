## **Project Overview**

This project is a full-stack web application built with Laravel on the backend and React on the frontend. It is a comprehensive digital toolkit designed to empower businesses like yours with a powerful dashboard and website platform. Built with the needs of social media marketing and website building in mind, adscraftify streamlines your workflow and optimizes your online presence, helping you reach new heights.

## **Backend Setup**

### **Prerequisites**

- PHP >= 7.4
- Composer
- MySQL or MariaDB
- Laravel CLI

## Installation

### Backend (Laravel)

1. Clone the repository:

    ```bash
    git clone <https://github.com/hassanshahzadaheer/adscraftify.git>
    
    ```

2. Navigate to the project directory:

    ```bash
    cd adscraftify
    
    ```

3. Install PHP dependencies:

    ```bash
    composer install
    
    ```

4. Generate an application key:

    ```bash
    php artisan key:generate
    
    ```

5. Run database migrations:

    ```bash
    php artisan migrate
    
    ```

6. Start the Laravel server:

    ```bash
    php artisan serve
    
    ```


### Frontend (React)

1. Navigate to the frontend directory:

    ```bash
    cd react
    
    ```

2. Install Node.js dependencies:

    ```bash
    npm install
    
    ```

3. Start the React development server:

    ```bash
    npm run dev
    
    ```


## Usage

- Access the application at `http://localhost:3000` in your browser.
- Explore the functionality of the application.

## API Documentation

- Endpoint 1: Description
    - Method: GET
    - URL: [`https://adscraftify.dev/api/customers`](https://adscraftify.dev/api/customers)
- Endpoint 2: Description

---

## Troubleshooting

- **Error: Unable to resolve `react-toastify`**
    - **Solution:** Install the `react-toastify` library using npm:

        ```bash
        npm install react-toastify
        
        ```

- **Error: Failed to resolve import `"react-toastify/dist/ReactToastify.css"`**
    - **Solution:** Install the missing CSS file:

        ```bash
        npm install react-toastify
        
        ```

- **Error: ENOENT: no such file or directory, open `../libs/simplebar/dist/simplebar.css`**
    - **Solution:** Install the missing `simplebar` library:

        ```bash
        npm install simplebar --save
        
        ```


## Deployment

- Provide instructions for deploying the backend application to a production server, if applicable.
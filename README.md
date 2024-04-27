# Ecommerce Backend

This repository contains the backend codebase for a simple Ecommerce application.

## Features

1. **User Authentication**: Users can sign up for a new account or sign in with existing credentials to access their shopping cart.
2. **Cart Management**: Users can view, add, and remove items from their shopping cart. Cart contents are stored in the database.
3. **Secure Authentication**: Authentication is secured using JSON Web Tokens (JWT) to ensure user data privacy.
4. **Database Integration**: Utilizes a database MongoDB to store user information, product details, and cart items.
5. **RESTful API**: Implements a RESTful API architecture to handle client-server communication.
6. **Efficient Deletion**: Provides a delete api on the cart page for users to remove items.


## Technologies Used

- Node.js
- Express.js
- MongoDB 
- JSON Web Tokens (JWT) for authentication

# Installation and Setup

To set up the application locally, follow these steps:

- Clone the repository:
```bash
git clone https://github.com/Anshul194/Ecommerce_Add_Cart_App.git
```

- Install dependencies:
```bash
npm install
```

- Set up environment variables:

Create a .env file based on the provided .env.example file and configure necessary environment variables such as database connection URI, JWT secret key, etc.

Run the application:
```bash
npm run dev
```

- Access the application in your web browser:
```bash
http://localhost:5001
```

### NOTE : If you stuck then contact me on [LinkedIn](https://www.linkedin.com/in/anshul-jha-069002259/)

## Request
- If You find any bug then please create issue i love to solve that
- If You have suggestion or want new feature the feel free to create an issue with label features.

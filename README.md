# HappEats

HappEats is a food delivery app.

## Description

This project aims to create an app where users can add food items to cart to order from the restaurant and checkout.

### Technical Used

- PERN stack - PostgreSQL, Express, React, Node.js
- CSS - Tailwind, Material UI
- Stripe for checkout test payment
- Redux for storing users states and cart
- moment.js for date and time
- OneMap API to fetch address with postal code
- JSON Web Token (JWT) for authentication

<!-- ### Wireframes -->

### User Stories

Project users are customers who will order food from the restaurant app.

User must be able to:

- Create Account
- Login
- Update Account Details
- Delete Account
- Add food item to cart
- Increment quantity of food item in cart
- Decrement quantity of food item in cart
- Delete food item from cart
- Checkout and make test payment

## Planning and Development Process

I started off planning the wireframes to have a rough idea of how the app should look like. Next, I planned the database table and included primary key and foreign key, and also to determine which values should be unique and not null.

I started developing the project from the frontend with CSS and skeleton of the body. Next, I coded the backend with CRUDs. After, I tried to link the backend and frontend with axios. I continued on from there and edit the backend and frontend as and when needed. Lots of debugging required.

### Problem-Solving Strategy

I console.logged from where the error is to determine where the problem lies in the code and tried to move from there by debugging the codes.
I also googled the error messages if I am not sure what that error means to find the answer.

### Unsolved problems

Unable to render the user account details after updating yet. Had to logout and login again to render the details for now.
Unable to update email when there is items in the user's cart.
User will automatically logout when user refreshes the page.

## APIs Used

- OneMap API - Used to get user's address with the postal code input.
- Restful APIs - Used to CRUD (Create, Read, Update, Delete)

## Acknowledgments

- Thank you to our instructor, Desmond for teaching us.
- Thank you to our IAs, Qizhen and Ernest for guiding us when we are stucked.
- Thank you to my classmates for introducing me to many other frameworks not taught in the syallabus.

# References

- https://www.onemap.gov.sg/docs/
- https://blog.logrocket.com/nodejs-expressjs-postgresql-crud-rest-api-example/

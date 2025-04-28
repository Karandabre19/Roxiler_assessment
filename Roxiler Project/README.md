# Roxiler Full Stack Challenge

A web application that allows users to submit ratings for stores registered on the platform. The ratings range from 1 to 5.

## Tech Stack

- **Backend**: Express.js
- **Database**: MySQL
- **Frontend**: React.js (to be implemented)

## Features

### System Administrator
- Can add new stores, normal users, and admin users
- Has access to a dashboard displaying:
  - Total number of users
  - Total number of stores
  - Total number of submitted ratings
- Can add new users with the following details:
  - Name
  - Email
  - Password
  - Address
- Can view a list of stores with the following details:
  - Name, Email, Address, Rating
- Can view a list of normal and admin users with:
  - Name, Email, Address, Role
- Can apply filters on all listings based on Name, Email, Address, and Role
- Can view details of all users, including Name, Email, Address, and Role
  - If the user is a Store Owner, their Rating should also be displayed
- Can log out from the system

### Normal User
- Can sign up and log in to the platform
- Signup form fields:
  - Name
  - Email
  - Address
  - Password
- Can update their password after logging in
- Can view a list of all registered stores
- Can search for stores by Name and Address
- Store listings should display:
  - Store Name
  - Address
  - Overall Rating
  - User's Submitted Rating
  - Option to submit a rating
  - Option to modify their submitted rating
- Can submit ratings (between 1 to 5) for individual stores
- Can log out from the system

### Store Owner
- Can log in to the platform
- Can update their password after logging in
- Dashboard functionalities:
  - View a list of users who have submitted ratings for their store
  - See the average rating of their store
- Can log out from the system

## Form Validations
- Name: Min 20 characters, Max 60 characters
- Address: Max 400 characters
- Password: 8-16 characters, must include at least one uppercase letter and one special character
- Email: Must follow standard email validation rules

## API Endpoints

### User Routes
- `POST /api/user/register` - Register a new user
- `POST /api/user/login` - Login a user
- `PUT /api/user/update-password` - Update user password (protected)
- `GET /api/user/profile` - Get user profile (protected)

### Store Routes
- `POST /api/store/addStore` - Add a new store (protected)
- `GET /api/store/fetchStore` - Get all stores (protected)
- `GET /api/store/search` - Search stores by name and address (protected)
- `GET /api/store/details/:storeId` - Get store details (protected)
- `POST /api/store/submitRating` - Submit a rating for a store (protected)
- `GET /api/store/getRating/:storeId` - Get ratings for a store (protected)
- `GET /api/store/owner-dashboard` - Get store owner dashboard (protected)

### Admin Routes
- `GET /api/admin/dashboard` - Get admin dashboard (protected)
- `GET /api/admin/users` - Get all users (protected)
- `POST /api/admin/users` - Add a new user (protected)
- `GET /api/admin/users/:userId` - Get user details (protected)
- `GET /api/admin/users/search` - Search users (protected)
- `GET /api/admin/stores` - Get all stores (protected)
- `POST /api/admin/stores` - Add a new store (protected)
- `GET /api/admin/stores/search` - Search stores (protected)

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file with the following variables:
   ```
   PORT=5000
   DB_PORT=3306
   DB_HOST=localhost
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_NAME=Roxiler_fullStack_Challenge
   SECRET_KEY=your_secret_key
   ```
4. Start the server:
   ```
   npm run dev
   ```

## Default Admin Credentials
- Email: admin@roxiler.com
- Password: Admin@123 
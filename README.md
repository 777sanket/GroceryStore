# Hyperlocal Store App

## Project Description

Hyperlocal Store App is a modern, full-stack web application designed to connect local grocery stores with customers in their area. The application provides an intuitive interface for customers to browse nearby stores, view available products with real-time inventory information, add items to their cart, and place orders. 

The project features beautiful UI animations, 3D interactive cards, spotlight effects, and smooth transitions to create an engaging shopping experience. Built with a focus on responsiveness and user experience, it works seamlessly across desktop and mobile devices.

### Prerequisites

- Node.js (v14 or newer)
- npm or yarn package manager
- MongoDB (local instance or MongoDB Atlas account)
- Git (for cloning the repository)

### Step 1: Clone the Repository

```bash
git clone https://github.com/777sanket/GroceryStore
cd GroceryStore
```

### Step 2: Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with the following content:
   ```
   PORT=5001
   MONGO_URI=mongodb://localhost:27017/hyperlocal-store
   NODE_ENV=development
   ```

4. If you're using MongoDB Atlas, replace the MONGO_URI with your connection string:
   ```
   MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/hyperlocal-store?retryWrites=true&w=majority
   ```

5. Start the backend server:
   ```bash
   npm run dev
   ```

### Step 3: Frontend Setup

1. Open a new terminal window and navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the React development server:
   ```bash
   npm start
   ```

4. The application should automatically open in your browser at `http://localhost:3000`

### Step 4: Database Seeding

To populate your database with sample data:

1. Ensure your MongoDB service is running and the backend server is connected
2. Open a new terminal in the backend directory:
   ```bash
   cd backend
   ```

3. **Important**: The database seeding process has a specific order that must be followed:
   
   - First, seed the stores collection:
     ```bash
     npm run seed:stores
     ```
   
   - Make note of the store IDs generated in MongoDB. The product.json file in sample-data directory must contain storeId values that match these store IDs.
   
   - Update the storeId fields in your product.json file if necessary to match the actual store IDs in your database. This ensures proper referential integrity between products and stores.
   
   - After ensuring store IDs match, seed the products:
     ```bash
     npm run seed:products
     ```
   
  
## Usage

1. Open your browser and navigate to `http://localhost:5713`
2. Browse the list of stores on the homepage
3. Click on a store to view its products
4. Add products to your cart
5. Click on the cart icon to view your cart and checkout
6. Enter your name and place your order
7. View your order confirmation with animated effects

## API Endpoints

- **Stores**: 
  - `GET /api/stores` - Get all stores
  - `GET /api/stores/:id` - Get a specific store

- **Products**: 
  - `GET /api/products/store/:storeId` - Get products for a specific store
  - `GET /api/products/:id` - Get a specific product

- **Orders**: 
  - `POST /api/orders` - Create a new order
  - `GET /api/orders/:id` - Get a specific order


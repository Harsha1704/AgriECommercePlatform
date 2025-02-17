# AgriEcommerce Platform

An e-commerce platform connecting farmers directly with consumers.

## Features

- **Buyer Features:**
  - Browse and search products
  - Add to cart and place orders
  - Track orders and view history
  - Secure payment options

- **Seller Features:**
  - Upload and manage products
  - View and manage orders
  - Track earnings and sales
  - Manage inventory

- **Admin Features:**
  - Manage users and roles
  - Moderate products and listings
  - Generate reports and analytics
  - Manage platform settings

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (running locally or cloud instance)
- Git (optional)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/AgriEcommercePlatform.git
   cd AgriECommercePlatform
   ```

2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

3. Create a `.env` file in the backend directory with the following content:
   ```
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/agriecommerce
   ```

4. Start the backend server:
   ```bash
   npm start
   ```

5. Open the frontend files in your browser:
   - Open `frontend/index.html` in your browser
   - Or use a local server like `live-server` to serve the frontend files

## Running the Application

1. Start the backend server:
   ```bash
   cd backend
   npm start
   ```

2. Open the frontend in your browser:
   - Open `frontend/index.html` in your browser
   - Or use a local server like `live-server` to serve the frontend files

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

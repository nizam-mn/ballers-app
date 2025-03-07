# React Native E-Commerce App

This is a simple React Native e-commerce application that fetches product data from an API, displays products in a grid layout, and includes search functionality.

## Features
- Fetches products from [DummyJSON API](https://dummyjson.com/products)
- Infinite scrolling with "Load More" functionality
- Search functionality by title, category, brand, tags, and price
- Displays product availability (In Stock / Out of Stock)

## Prerequisites
Before setting up the project, ensure you have the following installed:
- **Node.js** (Latest LTS version recommended)
- **npm** or **yarn** (Comes with Node.js)
- **Expo CLI** (if using Expo)
- **Android Studio** (for Android emulator) or **Xcode** (for iOS development) or Expo Go app
- **React Native CLI** (if using React Native CLI)

## Getting Started

### 1. Clone the repository
```sh
git clone https://github.com/nizam-mn/ballers-app.git
cd ballers-app
```

### 2. Install dependencies
Using npm:
```sh
npm install
```
Or using yarn:
```sh
yarn install
```

### 3. Run the application
For Expo:
```sh
npx expo start
```

For React Native CLI:
```sh
npx react-native start
```
Then, in a separate terminal, run:
```sh
npx react-native run-android   # For Android
npx react-native run-ios       # For iOS (Mac only)
```

## API Used
The app fetches products from the **DummyJSON API**:
```
GET https://dummyjson.com/products
Each product includes:
- `title`
- `price`
- `category`
- `brand`
- `stock`
- `tags` etc..

## Project Structure
```bash
.
├── components
│   ├── Card.js          # Product card component
├── screens
│   ├── HomeScreen.js    # Main screen with product listing & search
│   ├── DetailScreen.js  # Screen with product details
│   ├── LoginScreen.js   # Screen for login
├── App.js              # Entry point
├── package.json        # Dependencies and scripts



## Troubleshooting
If you encounter issues:
1. Ensure dependencies are installed (`npm install` or `yarn install`).
2. Restart Metro bundler (`npx react-native start --reset-cache`).
3. Make sure your emulator/device is running.
4. Check for API issues using Postman or a browser.

## Contributing
Feel free to fork this repo and make improvements! If you find any issues, open a GitHub issue.

## License
This project is licensed under the MIT License.


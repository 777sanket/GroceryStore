hyperlocal-store-app/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── orderController.js
│   │   ├── productController.js
│   │   └── storeController.js
│   ├── models/
│   │   ├── Order.js
│   │   ├── Product.js
│   │   └── Store.js
│   ├── routes/
│   │   ├── orderRoutes.js
│   │   ├── productRoutes.js
│   │   └── storeRoutes.js
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── public/
│   │   ├── index.html
│   │   └── favicon.ico
│   ├── src/
│   │   ├── components/
│   │   │   ├── Cart.js
│   │   │   ├── Header.js
│   │   │   ├── OrderConfirmation.js
│   │   │   ├── ProductItem.js
│   │   │   ├── StoreItem.js
│   │   │   └── StoreList.js
│   │   ├── context/
│   │   │   └── CartContext.js
│   │   ├── pages/
│   │   │   ├── CartPage.js
│   │   │   ├── HomePage.js
│   │   │   ├── OrderConfirmationPage.js
│   │   │   └── StorePage.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── App.css
│   └── package.json
│
└── sample-data/
    ├── products.json
    ├── stores.json
    └── orders.json
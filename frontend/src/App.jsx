import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import StorePage from "./pages/StorePage";
import CartPage from "./pages/CartPage";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";

function App() {
  return (
    <div className="min-h-screen w-screen bg-blue-300">
      <Header />
      <main className="container mx-auto py-4 px-2 sm:px-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/store/:id" element={<StorePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route
            path="/order-confirmation/:id"
            element={<OrderConfirmationPage />}
          />
        </Routes>
      </main>
      <footer className="py-4 mt-8 bg-white shadow-inner">
        <div className="container mx-auto text-center text-gray-500">
          © 2023 Hyperlocal Store App
        </div>
      </footer>
    </div>
  );
}

export default App;

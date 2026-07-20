import React from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import AppRoutes from "./routes/AppRoutes";
import { ShopProvider } from "./context/ShopContext";
import QuickView from "./components/common/QuickView";
import ScrollToTop from "./components/common/ScrollToTop";

function App() {
  return (
    <BrowserRouter>
      <ShopProvider>
        <ScrollToTop />
        <div className="d_app">
          <Header />
          <AppRoutes />
          <Footer />
          <QuickView />
        </div>
      </ShopProvider>
    </BrowserRouter>
  );
}

export default App;

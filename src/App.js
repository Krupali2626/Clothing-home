import React from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <BrowserRouter>
      <div className="d_app">
        <Header />
        <AppRoutes />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;

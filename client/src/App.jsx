import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Footer from "./components/Footer/Footer";
import Cart from "./components/Cart/Cart";
import Products from "./pages/Products/Products";
import { SearchProvider } from "./context/SearchContext";

function App() {
  return (
    <>
      <SearchProvider>
        <Navbar />
        <Cart />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
        </Routes>
        <Footer />
      </SearchProvider>
    </>
  );
}

export default App;

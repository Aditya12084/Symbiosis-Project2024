import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Footer from "./components/Footer/Footer";
import Cart from "./components/Cart/Cart";
import Products from "./pages/Products/Products";
import { SearchProvider } from "./context/SearchContext";
import Login from "./pages/Login/Login";
import { useEffect } from "react";
import { validateToken } from "./services/Apis";
import { assignUserDetails } from "./slices/UserSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  console.log(token);

  const checkTokenStatus = async () => {
    const res = await validateToken();

    console.log(res.data);
    if (res.status === 200) {
      dispatch(
        assignUserDetails({
          id: res.data.id,
          username: res.data.username,
          email: res.data.email,
        })
      );
    } else {
      dispatch(
        assignUserDetails({
          id: 0,
          username: "",
          email: "",
        })
      );
      navigate("/login-reg");
    }
  };

  useEffect(() => {
    if (token) {
      checkTokenStatus();
    } else {
      navigate("/login-reg");
    }
  }, []);

  return (
    <>
      <SearchProvider>
        <Navbar />
        <Cart />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/login-reg" element={<Login />} />
        </Routes>
        <Footer />
      </SearchProvider>
    </>
  );
}

export default App;

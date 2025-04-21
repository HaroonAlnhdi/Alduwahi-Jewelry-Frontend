import { useState , useEffect} from "react";
import { Routes, Route } from "react-router-dom";
import authService from "./services/authService";

import 'bulma/css/bulma.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';


import "bootstrap/dist/css/bootstrap.min.css";

// import language detection
import i18n from './i18n';

// User Components

import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import Landing from "./components/Landing/Landing";
import Dashboard from "./components/Dashboard/Dashboard";
import SignupForm from "./components/SignupForm/SignupForm";
import SigninForm from "./components/SigninForm/SigninForm";
import Products from "./components/Products/Products";
import ShoppingCart from "./components/Shopping-cart/ShoppingCart";
import ProductDetails from "./components/Products/ProductDetails";
import AboutUs from "./components/AboutUs/AboutUs";
import Orders from "./components/Orders/Orders";
import OrderDetails from "./components/Orders/OrderDetails";
import ContactUs from "./components/ContactUs/ContactUs";
import Profile from "./components/Profile/Profile";
import Favorites from "./components/Favorites/Favorites";

// Admin Components
import AdminNavBar from "./components/AdminDashboard/AdminNavBar/AdminNavBar";
import AdminFooter from "./components/AdminDashboard/AdminFooter/AdminFooter";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import ManageUsers from "./components/AdminDashboard/ManageUsers/ManageUsers";
import ManageOrders from "./components/AdminDashboard/ManageOrders/ManageOrders";
import ManageProducts from "./components/AdminDashboard/ManageProducts/ManageProducts";

const App = () => {
  useEffect(() => {
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
  }, [i18n.language]);
  
  const [user, setUser] = useState(authService.getUser());

  const handleSignout = () => {
    authService.signout();
    setUser(null);
  };

  return (
    <>
      {user ? (
        user.isAdmin ? (
          <>
            {/* Admin Dashboard */}
            <AdminNavBar handleSignout={handleSignout} />
            <Routes>
              <Route path="/AdminDashboard" element={<AdminDashboard />} />
              <Route
                path="/AdminDashboard/products"
                element={<ManageProducts />}
              />
              <Route path="/AdminDashboard/orders" element={<ManageOrders />} />
              <Route path="/AdminDashboard/users" element={<ManageUsers />} />
            </Routes>
            <AdminFooter />
          </>
        ) : (
          // User Dashboard
          <>
            <NavBar user={user} handleSignout={handleSignout} />
            <Routes>
              <Route path="/" element={<Dashboard user={user} />} />
              <Route path="/products" element={<Products user={user} />} />
              <Route path="/products/:prodId" element={<ProductDetails user={user} />} />

              <Route path="/orders/:userId" element={<Orders user={user} />} />
              <Route path="/orders/:orderId" element={<OrderDetails />} />

              <Route path="/aboutus" element={<AboutUs />} />
              <Route path="/contactus" element={<ContactUs />} />
              <Route
                path="/profile/:userId"
                element={<Profile user={user} />}
              />

              <Route path="/shoppingCart/:userId" element={<ShoppingCart user={user}/>} />
              <Route path="/favorites/:userId" element={<Favorites user={user} />} />
            </Routes>
            <Footer />
          </>
        )
      ) : (
        <>
          <NavBar user={user} handleSignout={handleSignout} />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/signup" element={<SignupForm setUser={setUser} />} />
            <Route path="/signin" element={<SigninForm setUser={setUser} />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:prodId" element={<ProductDetails />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/shoppingCart" element={<ShoppingCart />} />
            

          </Routes>
          <Footer />
        </>
      )}
    </>
  );
};

export default App;

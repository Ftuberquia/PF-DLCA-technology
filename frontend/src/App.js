import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProductDetail from "./views/Detail/ProductDetail";
import Landing from "./components/Landing/Landing";
import NavBar from "./components/NavBar/NavBar";
import { useAuth0 } from "@auth0/auth0-react";
import Footer from "./components/Footer/Footer";
import Ofertas from "./views/Ofertas/Ofertas";
import Form from "./views/Form/FormProduct";
import UserProfile from "./components/UserProfile/UserProfile";
import Productos from "./views/Productos/Productos";
import { ContactUs } from "./views/ContactUs/ContactUs";
import Favorites from "./views/Favorites/FavoritesProducts";
import Stripe from "./views/Stripe/Stripe";
import ConfirmationPage from "./views/Stripe/Confirmacion";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import FAQ from "./views/FAQ/FAQ";
import Terms from "./views/Terms/Terms";
import Privacy from "./views/Privacy/Privacy";
import About from "./views/About/About";
import Cart from "./views/Cart/cart";
import Login from "./views/Login/LogoutButton";
import Profile from "./views/Login/Profile";

const App = () => {
  const { pathname } = useLocation();
  const { isAuthenticated } = useAuth0();

  const darkMode = useSelector((state) => state.darkMode); // Agrega esta línea
  return (
    <div className={`App ${darkMode ? "AppDark" : ""}`}>
    {/* {pathname !== "*" && <Nav />}// como  cambiar Nav */}

    <Router>
      <NavBar />
      <Switch>
        <Route path="/productos" component={Productos} />
        <Route path="/product/:id" component={ProductDetail} />
        <Route path="/form" component={Form} />
        <Route path="/contacto" component={ContactUs} />
        <Route path="/userProfile" component={UserProfile} />
        <Route exact path="/" component={Landing} />
        <Route path="/compra" component={Stripe} />
        <Route path="/confirmation" component={ConfirmationPage}/>
        <Route path="/favorites" component={Favorites} />
        <Route path="/faq" component={FAQ} />
        <Route path="/terms" component={Terms} />
        <Route path="/privacy" component={Privacy} />
        <Route path="/about" component={About} />
        <Route path="/cart" component={Cart} />
        <Route path="/login" component={Login} />
        <Profile />
      </Switch>
      <Footer />
    </Router>
    </div>
  );
};

export default App;

import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProductDetail from "./views/Detail/ProductDetail";
import Landing from "./components/Landing/Landing";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import Ofertas from "./views/Ofertas/Ofertas";
import Form from "./views/Form/FormProduct";
import Productos from "./views/Productos/Productos";
import { ContactUs } from "./views/ContactUs/ContactUs";
import Favorites from "./views/Favorites/FavoritesProducts";
import Stripe from "./views/Stripe/Stripe";
import Login from "./views/Login/LogoutButton";
import Profile from "./views/Login/Profile";

const App = () => {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route path="/productos" component={Productos} />
        <Route path="/product/:id" component={ProductDetail} />
        <Route path="/form" component={Form} />
        <Route path="/contacto" component={ContactUs} />
        <Route exact path="/" component={Landing} />
        <Route path="/compra" component={Stripe} />
        <Route path="/favorites" component={Favorites} />
        <Route path="/login" component={Login} />
        <Profile />
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;

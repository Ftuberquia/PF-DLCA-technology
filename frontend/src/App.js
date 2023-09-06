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
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

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
        <Route path="/favorites" component={Favorites} />
      </Switch>
      <Footer />
    </Router>
    </div>
  );
};

export default App;




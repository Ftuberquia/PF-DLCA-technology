import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import ProductDetail from "./views/Detail/ProductDetail";
import Landing from "./components/Landing/Landing";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import Ofertas from "./views/Ofertas/Ofertas";
import Form from "./views/Form/FormProduct";
import UserProfile from "./components/UserProfile/UserProfile";
import Productos from "./views/Productos/Productos";
import { ContactUs } from "./views/ContactUs/ContactUs";
import Favorites from "./views/Favorites/FavoritesProducts";
import Stripe from "./views/Stripe/Stripe";
import ConfirmationPage from "./views/Stripe/ConfirmationPage";
import CancelPage from "./views/Stripe/CancelPage";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import FAQ from "./views/FAQ/FAQ";
import Terms from "./views/Terms/Terms";
import Privacy from "./views/Privacy/Privacy";
import About from "./views/About/About";
import Cart from "./views/Cart/cart";
import UserProfileView from "./views/Login/UserProfileView";
// import Profile from "./views/Login/Profile";
import AboutUs from "./views/AboutUs/AboutUs";
import MisComprasView from "./views/Mis Compras/MisComprasView";
import UsuariosAdmin from "./views/Admin/Usuarios Admin/UsuariosAdmin";
import ComprasAdmin from "./views/Admin/Compras Admin/ComprasAdmin";
import ProductosAdmin from "./views/Admin/Productos Admin/ProductosAdmin";
import NavBarAdmin from "./views/Admin/NavAdmin/NavBarAdmin";
import Dashboard from "./views/Admin/Dashboard/Dashboard"
import ChatBot from "./components/ChatBot/ChatBot.jsx";

const AdminLayout = () => {
  return (
    <div>
      <NavBarAdmin />
      <div>
        <Switch>
          <Route path="/admin/productos" component={ProductosAdmin} />
          <Route path="/admin/compras" component={ComprasAdmin} />
          <Route path="/admin/usuarios" component={UsuariosAdmin} />
        </Switch>
      </div>
    </div>
  );
};

const App = () => {
  const AdminLayout = () => {
    return (
      <div className="dashboard" style={{ display: 'flex', width:'99%'}}>      
        <NavBarAdmin/>
        <Switch>
          <Route exact path="/admin" component={Dashboard} />
          <Route path="/admin/productos" component={ProductosAdmin} />
          <Route path="/admin/compras" component={ComprasAdmin} />
          <Route path="/admin/usuarios" component={UsuariosAdmin} />
          <Route path="/admin/form" component={Form} />
        </Switch>        
      </div>
    );
  };


  // const darkMode = useSelector((state) => state.darkMode); // Agrega esta línea
  // <div className={`App ${darkMode ? "AppDark" : ""}`}>

  /* {pathname  !== "*" && <Nav />}// como  cambiar Nav */

  return (
    //   <div className={`App ${darkMode ? "AppDark" : ""}`}>
    //     {/* {pathname !== "*" && <Nav />}// como  cambiar Nav */}
    <Router>
      <NavBar />
      <Switch>
        <Route path="/productos" component={Productos} />
        <Route path="/product/:id" component={ProductDetail} />
        <Route path="/contacto" component={ContactUs} />
        <Route exact path="/" component={Landing} />
        <Route path="/compras" component={Stripe} />
        <Route path="/confirmation" component={ConfirmationPage} />
        <Route path="/cancel" component={CancelPage} />
        <Route path="/favorites" component={Favorites} />
        <Route path="/faq" component={FAQ} />
        <Route path="/terms" component={Terms} />
        <Route path="/privacy" component={Privacy} />
        <Route path="/about" component={About} />
        <Route path="/cart" component={Cart} />
        <Route path="/login" component={UserProfileView} />
        <Route path="/aboutUs" component={AboutUs} />
        <Route path="/admin" component={AdminLayout} />
        <Route path="/misCompras" component={MisComprasView} />
        {/* <Profile /> */}
      </Switch>
      <Route path="/" component={ChatBot} />
      <Footer />
    </Router>
  );
};
export default App;

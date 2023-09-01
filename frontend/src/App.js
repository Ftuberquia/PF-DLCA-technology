import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProductDetail from './views/ProductDetail';
import Landing from "./components/Landing/Landing";
import NavBar from "./components/NavBar/NavBar";
import Home from "./views/Home/Home";
import Footer from "./components/Footer/Footer";
// import Product from "./components/Product/Product";
import Ofertas from "./views/Ofertas/Ofertas";

const App = () => {
  return (
    <Router>
      <NavBar /> 
      <Switch>
        <Route path="/home" component={Home} />
        {/* <Route path="/product" component={Product} /> COMPONENTE PRODUCT ELIMINADO*/} 
        <Route path="/products/ofertas" component={Ofertas} />
        <Route path="/product/:id" component={ProductDetail} />
        <Route exact path="/" component={Landing} /> 
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;




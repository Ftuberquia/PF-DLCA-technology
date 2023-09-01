import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProductDetail from './views/ProductDetail';
import Landing from "./components/Landing/Landing";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import Ofertas from "./views/Ofertas/Ofertas";
import Productos from "./views/Productos/Productos";

const App = () => {
  return (
    <Router>
      <NavBar /> 
      <Switch>
        <Route path="/productos" component={Productos} />
        <Route path="/products/ofertas" component={Ofertas} />
        <Route path="/product/:id" component={ProductDetail} />
        <Route exact path="/" component={Landing} /> 
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;




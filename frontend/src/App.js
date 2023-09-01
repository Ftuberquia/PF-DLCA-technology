
import React from "react";
import { BrowserRouter as Routes, Route } from "react-router-dom";
import ProductDetail from './views/ProductDetail';
import Landing from "./components/Landing/Landing";
import NavBar from "./components/NavBar/NavBar";
import Home from "./views/Home/Home";
import Footer from "./components/Footer/Footer";
import Product from "./components/Product/Product";
import Ofertas from "./views/Ofertas/Ofertas";

const App = () => {

  return (

    <Routes>
      <Route path="/">
        <Landing />
          <Route path="/" component={NavBar}>
          <Route path="/home" component={Home} />
          <Route path="/product" component={<Product />} />
          <Route path='/products/ofertas' component={<Ofertas/>}/>
          <Route path="/product/:productId" component={ProductDetail} />
        </Route>
      </Route>
      <Footer />
    </Routes>
  );
};

export default App;

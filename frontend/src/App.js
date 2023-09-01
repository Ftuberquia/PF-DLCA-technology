import './App.css';
import React from "react";
import { BrowserRouter as Routes, Route } from "react-router-dom";
import ProductDetail from './views/ProductDetail';
import Landing from "./components/Landing/Landing";
import NavBar from "./components/NavBar/NavBar";
import Home from "./views/Home/Home";
import Footer from "./components/Footer/Footer";
import Products from "./components/Products/Products";
import Featured from "./views/Featured/Featured";

const App = () => {


  return (
    <Routes>
      <Route path="/">
        <Landing />
          <Route path="/" component={NavBar}>
          <Route path="/home" component={Home} />
          <Route path="/products" component={Products} />
          <Route path="/products/featured" component={Featured} />
          <Route path="/products/:id" component={ProductDetail} />
        </Route>
      </Route>
      <Footer />
    </Routes>
  );
};

export default App;

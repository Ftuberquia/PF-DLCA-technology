import './App.css';
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProductDetail from './components/views/ProductDetail';
import Landing from "./components/Landing/Landing";
import NavBar from "./components/NavBar/NavBar";
import Home from "./components/views/Home/Home";
// import Footer from "./components/Footer/Footer";


const App = () => {
  
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Landing />
        </Route>
        <Route exact path={"/home"}>
          <NavBar />
          <Home />
          <Route path="/product/:productId" component={ProductDetail} />
          {/* <Footer /> */}
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProductDetail from "./components/views/ProductDetail";
import ProductForm from "./views/Form/FormProduct";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/product/:productId" component={ProductDetail} />
          <Route path="/form" component={ProductForm} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

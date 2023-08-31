import './App.css';
import React from "react";
import { Switch, Route } from "react-router-dom";
import ProductDetail from './views/ProductDetail';


function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/product/:id" component={ProductDetail}/>
      </Switch>
      
    </div>
  );
}

export default App;

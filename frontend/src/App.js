import './App.css';
import React from "react";
import { Switch, Route } from "react-router-dom";
import ProductDetail from './components/views/ProductDetail';


function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/product/:productId" component={ProductDetail}/>
      </Switch>
      
    </div>
  );
}

export default App;

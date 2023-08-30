import React from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Landing from "./components/Landing/Landing";
// import NavBar from "./components/NavBar/NavBar";
import Home from "./views/Home/Home";
// import Footer from "./components/Footer/Footer";
// import UserPanel from "./components/UserPanel/UserPanel";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Route exact path="/">
          <Landing />
          <Route exact path={"/home"}>
            {/* <NavBar></NavBar> */}
            <Home></Home>
            {/* <Footer></Footer>
            <UserPanel></UserPanel> */}
          </Route>
        </Route>
      </Router>
    </div>
  );
};

export default App;
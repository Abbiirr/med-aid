import "./App.scss";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import ScrollToTop from "./components/ScrollToTop/index";
import HomeIndex from "./pages/Home/index";
import AboutIndex from "./pages/About/index";
import ContactIndex from "./pages/Contact/index";
import SearchResultIndex from "./pages/SearchResult/index";
import Appointment from "./pages/appointment/appointment";


import FourOFour from "./pages/FourOFour/index";

function App() {
  return (
    <div className="App">
      <Router>
        <ScrollToTop>
          <Switch>
            <Route exact path="/" component={HomeIndex} />
            <Route exact path="/about-us" component={AboutIndex} />
            <Route exact path="/contact-us" component={ContactIndex} />
            <Route exact path="/search" component={SearchResultIndex} />
            <Route exact path="/appointment" component={Appointment} />

            <Route path="*" component={FourOFour} />
          </Switch>
        </ScrollToTop>
      </Router>
    </div>
  );
}

export default App;
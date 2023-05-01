import logo from './logo.svg';
import React from 'react'
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Market from './containers/Market/Market';
import HomePage from './containers/Home/HomePage';
function App() {

  return (
    <Router>  
    <React.Fragment>
      <main role="main">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <Route exact path="/" component={HomePage} />
              <Route path="/market" component={Market} />
            </div>
          </div>
        </div>
      </main>
    </React.Fragment>
  </Router>
  );
}

export default App;

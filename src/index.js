import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	NavLink
} from 'react-router-dom';
import ReactDOM from 'react-dom';

import SignUp from './SignUp';
import App from './App';
import Home from './Home';
import AddTool from "./AddTool";
import MyTools from "./MyTools";
import BorrowTool from "./BorrowTool";
import SignUpPossible from ".SignUpPossible";
import BorrowModal from "./BorrowModal";
import AddToolModal from "./AddToolModal";

import './index.css';

import createBrowserHistory from 'history/createBrowserHistory';
const history = createBrowserHistory();

ReactDOM.render(

  <Router>
    <div className="contaniner">
			<nav className="navbar navbar-default">
			  <div className="contaniner-fluid">
			    <div className="navbar-header">
			      <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
			        <span className="sr-only">Toggle navigation</span>
			        <span className="icon-bar"></span>
			        <span className="icon-bar"></span>
			        <span className="icon-bar"></span>      
			      </button>
			      <a className="navbar-brand" href="#">Tool Share</a>
			    </div>
			    <div id="navbar" className="navbar-collapse collapse">
			      <ul className="nav navbar-nav">
			        <li><NavLink exact activeClassName="activeNav" to="/">Home</NavLink></li>
			        <li><NavLink activeClassName="activeNav" to="/addtool">Add a Tool</NavLink></li>
			        <li><NavLink activeClassName="activeNav" to="/submitUser">Sign Up</NavLink></li>
			      </ul>
			    </div>
			  </div>
			</nav>
      <Route exact path="/" component={App}> ></Route>
      <Route path="/submitUser" component={SignUp} history={history} ></Route>
      <Route path="/addtool" component={AddTool}></Route>
      
    </div>
  </Router>

	,
	document.getElementById('root')
);

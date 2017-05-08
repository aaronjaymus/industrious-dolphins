import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	NavLink,
	Switch
} from 'react-router-dom';
import ReactDOM from 'react-dom';

import SignUp from './SignUp';
import App from './App';
import Greeting from './Greeting';
import Login from './Login';

// import Home from './Home';

import AddTool from "./AddTool";
import MyTools from "./MyTools";
import BorrowTool from "./BorrowTool";
import ReturnTool from "./ReturnTool";
import ReplaceTool from "./ReplaceTool";
import BorrowModal from "./BorrowModal";
import AddToolModal from "./AddToolModal"; 

import CreateGroup from "./CreateGroup";

import Available from "./Available";
import Unavailable from "./Unavailable";



import './index.css';

//import createBrowserHistory from 'history/createBrowserHistory';
//const history = createBrowserHistory();

ReactDOM.render(
	
  <Router>

    <div className="container">
			<nav className="navbar navbar-default">
			  <div className="container-fluid">
			    <div className="navbar-header">
			      <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
			        <span className="sr-only">Toggle navigation</span>
			        <span className="icon-bar"></span>
			        <span className="icon-bar"></span>
			        <span className="icon-bar"></span>      
			      </button>
			      <a className="navbar-brand" href="/">Tool Share</a>
			    </div>
			    <div id="navbar" className="navbar-collapse collapse">
			      <ul className="nav navbar-nav">
			        <li><NavLink activeClassName="activeNav" to="/getMyTools">My Tools</NavLink></li>
			        <li><NavLink activeClassName="activeNav" to="/addtool">Add a Tool</NavLink></li>
			        <li><NavLink activeClassName="activeNav" to="/borrowtool">Borrow a Tool</NavLink></li>
			        <li><NavLink activeClassName="activeNav" to="/returntool">Return a Tool</NavLink></li>
			        <li><NavLink activeClassName="activeNav" to="/replacetool">Replace a Tool</NavLink></li>
				    	<li><NavLink activeClassName="activeNav" to="/login">Log In</NavLink></li>
			        <li><NavLink activeClassName="activeNav" to="/submitUser">Sign Up</NavLink></li>
			        <li><NavLink activeClassName="activeNav" to="/createGroup">Create Group</NavLink></li>
			      </ul>
			    </div>
			  </div>
			</nav>

			<Switch>

			    <Route exact path="/" component={App}> ></Route>
			    <Route path="/login" component={Login}></Route>
			    <Route path="/submitUser" component={SignUp} history={history} ></Route>
		        <Route path="/addtool" component={AddTool}></Route>
		        <Route path="/borrowtool" component={BorrowTool}></Route>
		        <Route path="/getMyTools" component={MyTools}></Route>
		        <Route path="/returntool" component={ReturnTool}></Route>
		        <Route path="/replacetool" component={ReplaceTool}></Route>
		        <Route path="/createGroup" component={CreateGroup}></Route>

 			</Switch>

    </div>
  </Router>

	,
	document.getElementById('root')
);
import React, { Component } from 'react';
import axios from 'axios';
import "./AddTool";
import "./MyTools.css";
import $ from "jquery";

class MyTools extends Component {
	constructor (props) {
		super(props);

		this.state = {
			thisUsersTools : ''
		}
	}

	componentDidMount() {

		console.log("componentDidMount MyTools");
		var toolsArray = [];
		var tempArticle = $("<Article />");
		console.log("created tempArticle");

		axios.post("/getMyTools", {
			userName : "e201"
    }).then( (response) => {
    	console.log(response);
    	console.log("response.data.length = " + response.data.length);
    	console.log("tool name = " + response.data[0].toolName);
    	for(var i=0; i<response.data.length; i++){
    		$("<h4>" + response.data[i].toolName +"</h4>" ).appendTo(tempArticle);
    	}
    	tempArticle.appendTo("#userToolDiv");
    })
	}

<<<<<<< HEAD
 componentDidMount(){
 	return axios.get("/mytools")
  		.then(function(response){
  			console.log(response);
  		// var firstName = response.data[0].firstName;
  		// 	console.log(firstName);
 	});

 }
=======

>>>>>>> master
	render(){
		return(
			<div className="MyTools">
					<h2>MyTools Page</h2>
<<<<<<< HEAD

						<div className="UsersTools">

=======
						<div className="UserAddress">
							{this.props.useraddress}
						</div>
						<div id="userToolDiv" className="UsersTools">
							<p>Your tools</p>
>>>>>>> master
						</div>
			</div>
		);
	}
}


export default MyTools;

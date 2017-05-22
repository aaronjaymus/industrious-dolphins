import React, { Component } from 'react';
import Available from "./Available";

class BorrowTool extends Component {
	render(){
		return(
			<div className="BorrowTool container overlay">
				<h1>Borrow Tools</h1>
				<Available />
			</div>
		);
	}
}

export default BorrowTool;
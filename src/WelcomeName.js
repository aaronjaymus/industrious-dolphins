import React, { Component } from 'react';
import axios from "axios";
import Greeting from "./Greeting";
import {
	Redirect
} from 'react-router-dom';

class WelcomeName extends React.Component {

  constructor(props) {
    super(props);

    this.state = { 
      isLoggedIn: false,
      firstName: ''
    };
  }

  componentDidMount() {
    // const { dispatch, currentURL } = this.props
    axios.get("/checkLogin").then(res => { this.setState({isLoggedIn: res})});
  }


  render() {

    if (this.state.isLoggedIn) {
      this.setState({firstName: this.state.isLoggedIn.firstName})
      console.log("I'm logged in!")
      console.log(this.state.isLoggedIn)
      return this.state.firstName;
    } else {
      console.log("false")
      return 'hello';
      // hard code redirect
      // return window.location.href = 'http://localhost:3000/getMyTools';
    }
  }
}

export default WelcomeName;
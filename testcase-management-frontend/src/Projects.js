import React, { Component } from 'react';
// import GridLayout from 'react-grid-layout';
// import {Container, Row, Col} from 'react-amazing-grid'
import { Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { NavItem } from 'react-bootstrap';
import { NavDropdown } from 'react-bootstrap';
import { MenuItem } from 'react-bootstrap';
import { FormGroup } from "react-bootstrap";
import { FormControl } from "react-bootstrap";
import { ButtonToolbar } from "react-bootstrap";
import { ToggleButtonGroup } from "react-bootstrap";
import { ToggleButton } from "react-bootstrap";
import { Row } from "react-bootstrap";
import my_image from './user.png';
import rocket from './rocket.png';

import ProjectList from './controller/ProjectController'
import EpicList from './controller/EpicController'

export default class Projects extends Component {
	constructor(props, context) {
	    super(props, context);

	    this.handleChange = this.handleChange.bind(this);

	    this.state = {
	      value: 2
	    };
  	}

	getValidationState() {
	    const length = this.state.value.length;
	    if (length > 10) return 'success';
	    else if (length > 5) return 'warning';
	    else if (length > 0) return 'error';
	    return null;
	}
	
	handleChange(e) {
    	this.setState({ value: e });
  	}

	handleSelect(selectedKey) {
		alert(`selected ${selectedKey}`);
	}
  


  render() {
  	return "proj"
  }
}


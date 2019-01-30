import React, { Component } from 'react';
import './App.css';
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
import TestCaseList from './controller/TestCaseController'

import Projects from './Projects'
import Epics from './Epics'

class Landing extends Component {
  render() {
    return (<>
      <h1> Landing </h1>
      <button onClick={this.props.openProjects}>  login </button>
    </>)
  }
}

class NavBarComp extends Component {
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
        return (
      <div className="App" >
        <div className="Nav" >
          <Navbar fluid>
            <Navbar.Header>
              <Navbar.Brand>
                <a href="#home"><p>Checklist<br></br> Managment</p></a>
              </Navbar.Brand>
            </Navbar.Header>

            <Nav>
              <NavItem eventKey={1} href="#"  >
              <form>
                <FormGroup
                  
                  controlId="formBasicText"
                  // validationState={this.getValidationState()}
                >
                  <FormControl
                    
                    type="text"
                    // value={this.state.value}
                    placeholder="Seach..."
                    onChange={this.handleChange}
                  />
                </FormGroup>
              </form>
              </NavItem>
            </Nav>
            <Nav pullRight>
              <NavItem >
                  <img src={my_image} />
              </NavItem>
              <NavDropdown eventKey={3} title="Odhran Daly" id="basic-nav-dropdown">
                    <MenuItem eventKey={3.1}>Profile</MenuItem>
                    <MenuItem eventKey={3.2}>Settings</MenuItem>
                    <MenuItem eventKey={3.3}>About</MenuItem>
                    <MenuItem divider />
                    <MenuItem eventKey={3.3}>FAQ</MenuItem>
                  </NavDropdown>
            </Nav>
          </Navbar>
        </div>

        <div className="Title">
        <Navbar fluid className="breadCrums">
        <Nav bsStyle="pills"  onSelect={this.handleSelect}>
            <NavItem eventKey={1} >
            <img src={rocket}  className="rocket-img"/> 
            <span className="text1">{this.props.page}</span>
            </NavItem>
        </Nav>
        <Nav pullRight className="radioButton">
            <NavItem eventKey={2}  pullRight>
              <ButtonToolbar>
              <ToggleButtonGroup type="checkbox" value={this.state.value} onChange={this.handleChange}>
              <ToggleButton value={1} className="btn-active"><p className="all-projects">All</p></ToggleButton>
              <ToggleButton value={2} className="not-active"><p className="my-projects">My {this.props.page}</p></ToggleButton>
              </ToggleButtonGroup>
              </ButtonToolbar>
            </NavItem>
            </Nav>
          </Navbar>
        </div>
        <div className="cardView">
          { this.props.children }
          {/*<ProjectList />*/}
          {/*<EpicList project={"10014"}/>*/}
        </div>
      </div>
      );
  }
}


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
        page: "Projects",
        project: null,
        epic: null,
        epicKey: null,
        popup: null
    }
  }

  openProject(projectId) {
    this.setState({ page: "Epics", project: projectId })
  }

  openEpic(epicId, epicKey) {
    console.log(epicId)
    this.setState({ page: "Tasks", epic: epicId, epicKey: epicKey})
  }

  render() {

      return (<NavBarComp page={this.state.page}>{ (() => {
        if (this.state.page === "Tasks"){
          return <TestCaseList epic={this.state.epic} parent={this}/>
        } else if (this.state.page === "Epics") {
          return <EpicList project={this.state.project} parent={this}/>
        } else if (this.state.page === "Projects") {
          return <ProjectList parent={this}/>
        }
      })()
      }</NavBarComp>)
  }
}

export default App;

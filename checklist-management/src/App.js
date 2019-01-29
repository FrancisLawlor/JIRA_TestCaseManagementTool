import React, { Component } from 'react';
import './App.css';
import ProjectList from './controller/ProjectController';
import EpicList from './controller/EpicController';

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

class TestPopup extends Component {
  render() {
    return (<>
      <h1> TestPopup </h1>
      <button onClick={this.props.closePopup}> go back </button>
    </>)
  }
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
        page: "projects",
        project: null,
        epic: null,
        popup: null
    }
    this.changePage = this.changePage.bind(this)
  }
  changePage(projectId) {
    this.setState({ page : "epics", project: projectId })
  }
  render() {
      return <Projects />
      // if (this.state.popup){
      //     return <TestPopup epic={this.state.epic} closePopup={this.closePopup} />
      // } else
      if (this.state.page === "epics") {
          return <EpicList project={this.state.project}/>
      } else if (this.state.page === "projects") {
          return <ProjectList callback={this.changePage}/>
      }
      // } else { // page === "landing"
      //     return <Landing openProjects={this.openProjects} />
      // }
  }
}

export default App;

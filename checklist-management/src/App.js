import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

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
      page : "landing",

      project : null,
      epic : null,
      popup : false,
    }

    this.openProjects = this.openProjects.bind(this)
    this.openProject = this.openProject.bind(this)
    this.openPopup = this.openPopup.bind(this)
    this.closePopup = this.closePopup.bind(this)
    this.closeEpic = this.closeEpic.bind(this)

  }

  openProjects() {
    this.setState({ page : "projects" })
  }

  openProject(proj) {
    this.setState({ page : "epics", project : proj })
  }

  openPopup(epic) {
    this.setState({ popup : true, epic : epic})
  }

  closePopup() {
    this.setState({ popup : false, epic : null })
  }

  closeEpic() {
    this.setState({ page : "projects", project : null })
  }

  render() {
    if (this.state.popup){
      return <TestPopup epic={this.state.epic} closePopup={this.closePopup} />
    } else if (this.state.page === "epics") {
      return <Epics project={this.state.project} openPopup={this.openPopup} closeEpic={this.closeEpic} />
    } else if (this.state.page === "projects") {
      return <Projects openProject={this.openProject} />
    } else { // page === "landing"
      return <Landing openProjects={this.openProjects} />
    }
  }
}

export default App;

import React, { Component } from 'react';
import './App.css';
import ProjectList from './controller/ProjectController';
import EpicList from './controller/EpicController';

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

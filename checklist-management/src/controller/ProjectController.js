import React, {Component} from "react";
import { Grid } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Thumbnail } from "react-bootstrap";
import { Button } from "react-bootstrap";


class ProjectCard extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        let project = this.props.project
        let category
        if (project.hasOwnProperty("projectCategory")) {
            category = <p>{project.projectCategory.name}</p>
        } else {
            category = <p><i>Unassigned</i></p>
        }

        return (
            <div className="grid-item" bsStyle="sm">
       
             <Thumbnail src={project.avatarUrls["48x48"]} alt="242x200" className="card">
                 <h3>{project.name}</h3>
                 { category }
                 <p>
                 <Button bsStyle="default" className="view-btn" onClick={() => this.props.callback(project.id)}>View</Button>
                 </p>
             </Thumbnail>
            </div>
            
        )
    }
}

class ProjectList extends Component {
    constructor(props) {
        super(props)
        this.state = {data : []}
    }

    render() {
        return <div className="grid-container">{
            this.state.data.map((project) => {
                return <ProjectCard key={project.id} project={project} callback={this.props.callback} />
                // return <li key={project.id} onClick={() => this.props.callback(project.id)}><img src={project.avatarUrls["48x48"]}/>{project.name}</li>
            })
        }</div>
    }

    componentDidMount() {
        fetch('http://localhost:8080/projects')
            .then(response => response.json())
            .then(data => this.setState({data}));
    }
}

export default ProjectList;

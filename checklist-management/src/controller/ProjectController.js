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
        // callback = this.props.callback(project.id)
        return (
            <div className="grid-item" bsStyle="sm">
            
           
       
             <Thumbnail src="/assets/thumbnaildiv.png" alt="242x200" className="card">
                 <h3>Thumbnail label</h3>
                 <p>Description</p>
                 <p>
                 <Button bsStyle="primary">Button</Button>&nbsp;
                 <Button bsStyle="default">Button</Button>
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
        // fetch('http://localhost:8080/projects')
        //     .then(response => response.json())
        //     .then(data => this.setState({data}));

        this.setState({
            data : [1,2,3, 4, 5, 6]
        })
    }
}

export default ProjectList;
import React, {Component} from "react";
import { Grid } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Thumbnail } from "react-bootstrap";
import { Button } from "react-bootstrap";
import rocket from '.././rocket.png';
import view from '.././view.png';
import heartoff from '.././heart-off.png';


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

            <div className="grid-item" >
                
             <Thumbnail className="card">
                 <div className="heart-placeholder"><img src={heartoff}/></div>
                 <div className="avatar-placeholder"><img src={project.avatarUrls["48x48"]} className="avatar"/></div>
                 
                 <p className="project-name">{project.name}</p>
                 <p className="catagory">{ category }</p>
                 
                 <Button bsStyle="default" className="view-btn"><img src={view} className="view-img"/><span className="view-text">View</span></Button>
                 
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
            data : [
                {name : "Hello",
                avatarUrls : {
                    "48x48" : rocket
                },
                projectCategory : {
                    name : "Content"
                }}, 

                {name : "Hello",
                avatarUrls : {
                    "48x48" : rocket
                },
                projectCategory : {
                    name : "Content"
                }},
                
                {name : "Hello",
                avatarUrls : {
                    "48x48" : rocket
                },
                projectCategory : {
                    name : "Content"
                }},

                {name : "Hello",
                avatarUrls : {
                    "48x48" : rocket
                },
                projectCategory : {
                    name : "Content"
                }},

                {name : "Hello",
                avatarUrls : {
                    "48x48" : rocket
                },
                projectCategory : {
                    name : "Content"
                }},

                {name : "Hello",
                avatarUrls : {
                    "48x48" : rocket
                },
                projectCategory : {
                    name : "Content"
                }},

                {name : "Hello",
                avatarUrls : {
                    "48x48" : rocket
                },
                projectCategory : {
                    name : "Content"
                }},

                {name : "Hello",
                avatarUrls : {
                    "48x48" : rocket
                },
                projectCategory : {
                    name : "Content"
                }},
            ]
        })
    }
}

export default ProjectList;

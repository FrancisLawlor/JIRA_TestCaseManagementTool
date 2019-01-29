import React, {Component} from "react";

class ProjectCard extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        // callback = this.props.callback(project.id)
        return <li> project card goes here ... </li>
    }
}

class ProjectList extends Component {
    constructor(props) {
        super(props)
        this.state = {data : []}
    }

    render() {
        return <ul>{
            this.state.data.map((project) => {
                return <ProjectCard key={project.id} project={project} callback={this.props.callback} />
                // return <li key={project.id} onClick={() => this.props.callback(project.id)}><img src={project.avatarUrls["48x48"]}/>{project.name}</li>
            })
        }</ul>
    }

    componentDidMount() {
        // fetch('http://localhost:8080/projects')
        //     .then(response => response.json())
        //     .then(data => this.setState({data}));

        this.setState({
            data : [1,2,3]
        })
    }
}

export default ProjectList;
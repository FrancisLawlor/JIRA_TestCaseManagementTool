import React, {Component} from "react";

class ProjectList extends Component {
    constructor(props) {
        super(props)
        this.state = {data : []}
    }

    render() {
        return <ul>{
            this.state.data.map((project) => {
                return <li key={project.id} onClick={() => this.props.callback(project.id)}><img src={project.avatarUrls["48x48"]}/>{project.name}</li>
            })
        }</ul>
    }

    componentDidMount() {
        fetch('http://localhost:8080/projects')
            .then(response => response.json())
            .then(data => this.setState({data}));
    }
}

export default ProjectList;
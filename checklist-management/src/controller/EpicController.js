import React, {Component} from "react";

class EpicList extends Component {
    constructor(props) {
        super(props)
        this.state = {data : null}
    }

    render() {
        // console.log(this.state.data
        if (this.state.data == null) {
            return "loading..."
        }

        return <ul>{
            this.state.data.issues.map((epic) => {
                return <li onClick={() => this.props.callback(epic.id)}>{epic.key} {epic.fields.summary}</li>
            })
        }</ul>
    }

    componentDidMount() {
        fetch('http://localhost:8080/epics/' + this.props.project)
            .then(response => response.json())
            .then(data => this.setState({data}));
    }
}

export default EpicList;
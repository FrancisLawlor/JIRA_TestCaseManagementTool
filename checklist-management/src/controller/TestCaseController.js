import React, {Component} from "react";

class TestCaseList extends Component {
    constructor(props) {
        super(props)
        this.state = {data : null}
    }

    submit() {
        fetch('http://localhost:8080/comments/GLOB-110', {
           method: 'post',
           headers: {'Content-Type':'application/json'},
           body:
            "{'body':'http://localhost:3000/testcases/epic/25575'}"
        });
    }

    render() {
        if (this.state.data == null) {
            return "loading..."
        }

        // console.log(this.state.data)
        // console.log(this.state.data._embedded.testCaseList)
        return <div>
        <ul>
        {
            this.state.data.map((task) => {
                return  <li>{task.name}</li>
            })
        }
        </ul>
        <button onClick={this.submit}> submit </button>
        </div>
    }

    componentDidMount() {
        fetch('http://localhost:8080/testcases/epic/' + this.props.epic)
            .then(response => {
                if (!this.hasOwnProperty("_embedded")){
                    return []
                } else {
                    return response.json()._embedded.testCaseList
                }
            })
            .then(data => this.setState({data}));
    }
}

export default TestCaseList;
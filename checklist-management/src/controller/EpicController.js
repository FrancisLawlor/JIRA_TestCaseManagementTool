import React, {Component} from "react";
import { Grid } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Thumbnail } from "react-bootstrap";
import { Button } from "react-bootstrap";
import view from '.././view.png';
import heartoff from '.././heart-off.png';

function importAll(r) {
  return r.keys().map(r);
}

const icons = importAll(require.context('../icons', false, /\.svg$/));

class EpicCard extends Component {
    constructor(props){
        super(props);

        let iconNum = Math.floor(Math.random() * (29))+1
        let icon = icons[iconNum]

        this.state = { icon }
    }

    render(){
        return (
            <div className="grid-item" >
                
             <Thumbnail className="card">
                 <div className="heart-placeholder"><img src={heartoff}/></div>
                 <div className="avatar-placeholder"><img src={this.state.icon} className="avatar"/></div>
                 
                 <div className="epic-name-div"><p className="project-name-epic">{this.props.epic.fields.summary}</p></div>

                 {/* <p className="catagory">{ this.props.epic.key }</p> */}
                 
		 <Button bsStyle="default" className="view-btn" onClick={() => this.props.parent.openEpic(this.props.epic.id, this.props.epic.key)} ><img src={view} className="view-img"/><span className="view-text">View</span></Button>
                 
             </Thumbnail>
            </div>

            // <div className="grid-item" bsStyle="sm">
            //  <Thumbnail src={this.state.icon} alt="242x200" className="card">
            //      <h3> {this.props.epic.fields.summary} </h3>
            //      <p> {this.props.epic.key} </p>
            //      <p>
            //      <Button bsStyle="default" className="view-btn">View</Button>
            //      </p>
            //  </Thumbnail>
            // </div>   
        )
    }
}

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

        return <div className="grid-container">{
            this.state.data.issues.map((epic) => {
                return <EpicCard key={epic.id} epic={epic} parent={this.props.parent} />
                // return <li key={project.id} onClick={() => this.props.callback(project.id)}><img src={project.avatarUrls["48x48"]}/>{project.name}</li>
            })
        }</div>
    }

    componentDidMount() {
        fetch('http://localhost:8080/epics/' + this.props.project)
            .then(response => response.json())
            .then(data => this.setState({data}));
    }
}

export default EpicList;

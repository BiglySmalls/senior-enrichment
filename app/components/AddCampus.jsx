import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postCampus } from '../reducers';


class AddCampus extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newCampusName: '',
            newImageUrl: ''
        }

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleImgChange = this.handleImgChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleNameChange(evt) {
        this.setState({
            newCampusName: evt.target.value
        })
    }

    handleImgChange(evt) {
        this.setState({
            newImageUrl: evt.target.value
        })
    }

    handleSubmit(evt) {
        const campus = { name: this.state.newCampusName, image: this.state.newImgChange };

        evt.preventDefault();
        console.log(this.props)
        this.props.dispatchNewCampus(campus);
        this.setState({
            newCampusName: '',
            newImageUrl: ''
        });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>Add New Campus</label>
                
                <input
                    name="newCampusName"
                    placeholder="Campus Name"
                    onChange={this.handleNameChange}
                    value={this.state.newCampusName} />

                <input
                    name="newImageUrl"
                    placeholder="Campus Image"
                    onChange={this.handleImgChange}
                    value={this.state.newImageUrl} />

                <button className="btn btn-success" type="submit">Submit</button>
            </form>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    dispatchNewCampus: (campus) => dispatch(postCampus(campus))
})

export default connect(null, mapDispatchToProps)(AddCampus);
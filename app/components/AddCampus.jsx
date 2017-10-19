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


    render() {
        return (
            <form onSubmit={(e) => {
                const campus = { name: this.state.newCampusName, image: this.state.newImgChange };

                e.preventDefault();
                this.props.dispatch(postCampus(campus));
                this.setState({
                    newCampusName: '',
                    newImageUrl: ''
                })


            }}>
                <input
                    name="newCampusName"
                    placeholder="Campus Name"
                    onChange={this.handleNameChange} />

                <input
                    name="newImageUrl"
                    placeholder="Campus Image"
                    onChange={this.handleImgChange} />

                <button className="btn btn-submit" type="submit">Submit</button>
            </form>
        )
    }
}

export default connect()(AddCampus);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postStudent } from '../reducers';


class AddStudent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newStudentName: '',
            newStudentEmail: ''
        }

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleNameChange(evt) {
        this.setState({
            newStudentName: evt.target.value
        })
    }

    handleEmailChange(evt) {
        this.setState({
            newStudentEmail: evt.target.value
        })
    }

    handleSubmit(evt) {
        const student = { name: this.state.newStudentName, email: this.state.newStudentEmail, campusId: this.props.campusId };

        evt.preventDefault();
        this.props.dispatchNewStudent(student);
        this.setState({
            newStudentName: '',
            newStudentEmail: ''
        });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>Add New Student</label>

                <input
                    name="newStudentName"
                    placeholder="Student Name"
                    value={this.state.newStudentName}
                    onChange={this.handleNameChange} />

                <input
                    name="newStudentUrl"
                    placeholder="Student Email"
                    value={this.state.newStudentEmail}
                    onChange={this.handleEmailChange} />

                <button className="btn btn-success" type="submit">Submit</button>
            </form>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    dispatchNewStudent: (student) => dispatch(postStudent(student))
})

export default connect(null, mapDispatchToProps)(AddStudent);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateStudent } from '../reducers';

class StudentProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            disabled: true,
            studentName: '',
            studentEmail: '',
        }
        this.enableInputs = this.enableInputs.bind(this);
    }

    componentDidMount() {

        const { name, email, campusId } = this.props.student;
        this.setState({
            studentName: name,
            studentEmail: email,
        })
    }

    enableInputs(evt) {
        evt.preventDefault();
        this.setState({ disabled: false })
    }

    handleSubmit(evt) {
        evt.preventDefault();
        const student = {
            name: this.state.name,
            email: this.state.email
        }

        updateStudent(student);
        this.setState({
            disabled: true,
            studentName: '',
            studentEmail: '',
        });
    }

    render() {
        return (
            <form>
                <div className="input-group">
                    <input
                        disabled={this.state.disabled}
                        value={this.state.studentName}
                        name="studentName"
                        onChange={evt => this.setState({ studentName: evt.target.studentName.value })} />

                    <input
                        disabled={this.state.disabled}
                        value={this.state.studentEmail}
                        name="studentEmail"
                        onChange={evt => this.setState({ studentName: evt.target.studentEmail.value })} />

                    <button className="btn btn-default" onClick={this.enableInputs}>Edit</button>
                    <button className="btn btn-default">Submit</button>
                </div>
            </form>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const studentId = Number(ownProps.match.params.studentId);
    const student = state.students.find(student => student.id === studentId);

    return {
        student,
    };
};

const mapDispatchToProps = (dispatch) => ({
    updateStudent: (student) => dispatch(updateStudent(student))
})

export default connect(mapStateToProps, mapDispatchToProps)(StudentProfile);
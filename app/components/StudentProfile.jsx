import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { putStudent } from '../reducers';

class StudentProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            disabled: true,
            studentName: '',
            studentEmail: '',
            student: {}
        }
        this.enableInputs = this.enableInputs.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.students) {
            const studentId = +this.props.match.params.studentId
            const student = nextProps.students.find(student => student.id === studentId);
            const { name, email } = student;
            this.setState({
                student,
                studentName: name,
                studentEmail: email,
            })
        }
    }

    enableInputs(evt) {
        evt.preventDefault();
        this.setState({ disabled: false })
    }

    handleSubmit(evt) {
        evt.preventDefault();
        const studentId = this.state.student.id;
        const student = {
            name: this.state.studentName,
            email: this.state.studentEmail
        }

        console.log(student);
        this.props.dispatchStudent(studentId, student);
        this.setState({
            disabled: true
        });
    }

    handleNameChange(evt) {
        this.setState({ studentName: evt.target.value });
    }

    handleEmailChange(evt) {
        this.setState({ studentEmail: evt.target.value });
    }

    render() {
        const student = this.state.student;
        // const studentId = +this.props.match.params.studentId
        // const student = this.props.students.find(student => student.id === studentId);
        console.log('Student', student)

        // have filter to get student here
        // placeholder is from props
        if (!student.name) return null
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="input-group">
                    <Link to={`/campuses/${student.campusId}`}>
                        <div className="caption">
                            <h5>{`Back to ${student.campus.name}`}</h5>
                        </div>
                    </Link>

                    {/* INPUT FIELDS TO EDIT STUDENT INFO; LOADS DEFAULT INFO AFTER REFRESH */}

                    <input
                        disabled={this.state.disabled}
                        value={this.state.studentName}
                        type="text"
                        name="studentName"
                        onChange={this.handleNameChange} />

                    <input
                        disabled={this.state.disabled}
                        value={this.state.studentEmail}
                        name="studentEmail"
                        onChange={this.handleEmailChange} />

                    {/* BUTTONS TO ENABLE INPUT FIELDS AND SUBMIT EDITTED CAMPUS INFO */}


                    <button className="btn btn-warning" onClick={this.enableInputs}>Edit</button>
                    <button className="btn btn-success">Submit</button>
                </div>
            </form>
        )
    }
}

const mapStateToProps = (state) => {
    if (!state.students.length) return {}
    return {
        students: state.students,
    };
};

const mapDispatchToProps = (dispatch) => ({
    dispatchStudent: (studentId, student) => dispatch(putStudent(studentId, student))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StudentProfile));
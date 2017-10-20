import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchStudents, removeStudent } from '../reducers';

class AllStudents extends Component {

    render() {
        const { students } = this.props;

        return (
            <div>
                <div className="row">
                    {
                        students.map(student => (
                            <div className="col-xs-4 thumbnail" key={student.id}>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => this.props.OnDelete(student.id)}>Delete</button>

                                <Link to={`/students/${student.id}`}>
                                    <div className="caption">
                                        <h5>
                                            <span>{student.name}</span>
                                        </h5>
                                    </div>
                                </Link>
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = function (state) {
    return {
        students: state.students
    };
};

const mapDispatchToProps = function (dispatch) {
    return {
        OnDelete: id => { dispatch(removeStudent(id)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllStudents);
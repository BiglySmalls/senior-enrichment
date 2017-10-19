import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchStudents, removeStudent } from '../reducers';


class StudentList extends Component {

    componentDidMount() {
        this.props.OnMount()
    }

    render() {
        const { students } = this.props;

        return (
            <div>
                <h3>{this.props.campusName}</h3>
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

const mapStateToProps = function (state, ownProps) {
    const campusId = Number(ownProps.match.params.campusId);
    const filteredStudents = campusId ? state.students.filter(student => student.campusId === campusId) : state.students;
    const campusName = ownProps.campusName ? `${ownProps.campusName} Campus` : 'All Students';    

    return {
        students: filteredStudents  
    };
};

const mapDispatchToProps = function (dispatch) {
    return {
        OnMount: () => { dispatch(fetchStudents()) },
        OnDelete: id => { dispatch(removeStudent(id)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentList);
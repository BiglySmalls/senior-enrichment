import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { removeStudent } from '../reducers';
import CampusInfo from './CampusInfo';
import AddStudent from './AddStudent'; 


class StudentList extends Component {

    render() {
        const { campusId, campusName, students } = this.props;

        return (
            <div>
                <CampusInfo campusId={campusId} />

                <h3>{campusName}</h3>
                <div className="">
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

                <AddStudent campusId={campusId}/>
            </div>
        )
    }
}

const mapStateToProps = function (state, ownProps) {
    const campusId = Number(ownProps.match.params.campusId);
    const filteredStudents = campusId ? state.students.filter(student => student.campusId === campusId) : state.students;
    const campusName = ownProps.campusName ? `${ownProps.campusName} Campus` : 'All Students';

    return {
        students: filteredStudents,
        campusId,
    };
};

const mapDispatchToProps = function (dispatch) {
    return {
        OnDelete: id => { dispatch(removeStudent(id)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentList);
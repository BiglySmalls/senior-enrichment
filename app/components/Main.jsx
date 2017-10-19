import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
// import Navbar from './Navbar';
import Home from './Home';
import CampusList from './CampusList';
import Campus from './Campus';
import StudentList from './StudentList';
import StudentProfile from './StudentProfile';
import { fetchCampuses, fetchStudents } from '../reducers';

class Main extends Component {

    componentDidMount() {
        this.props.fetchAll();
    }

    render() {
        return (
            <div>
                <main>
                    <Switch>
                        <Route exact path="/campuses" component={CampusList} />
                        <Route path="/campuses/:campusId" component={StudentList} />
                        <Route exact path="/students" component={StudentList} />
                        <Route path="/students/:studentId" component={StudentProfile} />
                        <Route component={Home} />
                    </Switch>
                </main>
            </div>
        );
    }
}

const mapDispatchToProps = function (dispatch) {
    return {
        fetchAll: () => {
            dispatch(fetchCampuses())
            dispatch(fetchStudents())
        }
    }
}

export default withRouter(connect(null, mapDispatchToProps)(Main));
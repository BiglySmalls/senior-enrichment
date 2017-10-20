import { combineReducers } from 'redux';
import axios from 'axios';

const initialState = {
    campuses: [],
    students: []
}

// ACTION TYPES

const GET_CAMPUSES = 'GET_CAMPUSES';
const ADD_NEW_CAMPUS = 'ADD_NEW_CAMPUS';
const UPDATE_CAMPUS = 'UPDATE_CAMPUS';
const DELETE_CAMPUS = 'DELETE_CAMPUS'
const GET_STUDENTS = 'GET_STUDENTS';
const ADD_NEW_STUDENT = 'ADD_NEW_STUDENT';
const UPDATE_STUDENT = 'UPDATE_STUDENT';
const DELETE_STUDENT = 'DELETE_STUDENT';


// ACTION CREATORS

export const getCampuses = (campuses) => ({
    type: GET_CAMPUSES,
    campuses
})

export const addNewCampus = (newCampus) => ({
    type: ADD_NEW_CAMPUS,
    newCampus
})

export const updateCampus = (updatedCampus) => ({
    type: UPDATE_CAMPUS,
    updatedCampus
})

export const deleteCampus = (deletedCampus) => ({
    type: DELETE_STUDENT,
    deletedCampus
})

export const getStudents = (students) => ({
    type: GET_STUDENTS,
    students
})

export const addNewStudent = (newStudent) => ({
    type: ADD_NEW_STUDENT,
    newStudent
})

export const updateStudent = (updatedStudent) => ({
    type: UPDATE_STUDENT,
    updatedStudent
})

export const deleteStudent = (deletedStudent) => ({
    type: DELETE_STUDENT,
    deletedStudent
})

// THUNKS

export function fetchCampuses() {
    return function thunk(dispatch) {
        return axios.get('/api/campuses')
            .then(res => res.data)
            .then(allCampuses => {
                dispatch(getCampuses(allCampuses));
            });
    };
}

export function postCampus(campus) {
    return function thunk(dispatch) {
        return axios.post('/api/campuses', campus)
            .then(res => res.data)
            .then(newCampus => {
                dispatch(addNewCampus(newCampus));
            });
    };
}

export function putCampus(campusId, campus) {
    return function thunk(dispatch) {
        return axios.put(`/api/campuses/${campusId}`, campus)
            .then(res => res.data)
            .then(updatedCampus => {
                dispatch(updateCampus(updatedCampus));
                dispatch(fetchCampuses());
            })
    }
}

export function removeCampus(campusId) {
    return function thunk(dispatch) {
        return axios.delete(`/api/campuses/${campusId}`)
            .then(res => res.data)
            .then(deletedCampus => {
                dispatch(deleteCampus(deletedCampus));
                dispatch(fetchCampuses());
            });
    };
}

export function fetchStudents() {
    return function thunk(dispatch) {
        return axios.get('/api/students')
            .then(res => res.data)
            .then(allStudents => {
                dispatch(getStudents(allStudents));
            });
    };
}

export function postStudent(student) {
    return function thunk(dispatch) {
        return axios.post('/api/students', student)
            .then(res => res.data)
            .then(newStudent => {
                dispatch(addNewStudent(newStudent));
            });
    };
}

export function putStudent(studentId, student) {
    return function thunk(dispatch) {
        return axios.put(`/api/students/${studentId}`, student)
            .then(res => res.data)
            .then(updatedStudent => {
                dispatch(updateStudent(updatedStudent));
                dispatch(fetchStudents());
            })
    }
}

export function removeStudent(studentId) {
    return function thunk(dispatch) {
        return axios.delete(`/api/students/${studentId}`)
            .then(res => {
                console.log(res.data);
                return res.data;
            })
            .then(student => {
                dispatch(deleteStudent(student));
                dispatch(fetchStudents());
            });
    };
}

// REDUCER

const rootReducer = function (state = initialState, action) {
    const newState = Object.assign({}, state);
    let index;

    switch (action.type) {
        case GET_CAMPUSES:
            newState.campuses = action.campuses;
            return newState;

        case ADD_NEW_CAMPUS:
            newState.campuses = [...newState.campuses, action.newCampus];
            return newState;

        case UPDATE_CAMPUS:
            index = newState.campuses.findIndex(campus => campus.id === action.updatedCampus.id);
            newState.campuses[index] = action.campus;
            return newState;

        case DELETE_CAMPUS:
            index = newState.campuses.indexOf(action.deletedCampus);
            if (index > -1) newState.campuses.splice(index, 1);
            newState.students = newState.students.filter(student => student.campusId !== campus.id);
            return newState;

        case GET_STUDENTS:
            newState.students = action.students;
            return newState;

        case ADD_NEW_STUDENT:
            newState.students = [...newState.students, action.newStudent];
            return newState;

        case UPDATE_STUDENT:
            index = newState.students.findIndex(student => student.id === action.updatedStudent.id);
            newState.students[index] = action.updatedStudent;
            return newState;

        case DELETE_STUDENT:
            index = newState.students.indexOf(action.deletedStudent);
            if (index > -1) newState.students.splice(index, 1);
            return newState;

        default:
            return state;
    }
};

export default rootReducer;

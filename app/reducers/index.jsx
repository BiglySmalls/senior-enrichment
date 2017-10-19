import { combineReducers } from 'redux';
import axios from 'axios';

const initialState = {
    campuses: [],
    students: []
}

// ACTION TYPES

const GET_CAMPUSES = 'GET_CAMPUSES';
const ADD_NEW_CAMPUS = 'ADD_NEW_CAMPUS';
const DELETE_CAMPUS = 'DELETE_CAMPUS'
const GET_STUDENTS = 'GET_STUDENTS';
const ADD_STUDENT = 'ADD_STUDENT';
const UPDATE_STUDENT = 'UPDATE_STUDENT';
const DELETE_STUDENT = 'DELETE_STUDENT';


// ACTION CREATORS

export const getCampuses = (campuses) => ({
    type: GET_CAMPUSES,
    campuses
})

export const addNewCampus = (campus) => ({
    type: ADD_NEW_CAMPUS,
    campus
})

export const deleteCampus = (campus) => ({
    type: DELETE_STUDENT,
    campus
})

export const getStudents = (students) => ({
    type: GET_STUDENTS,
    students
})

export const addStudent = (student) => ({
    type: ADD_STUDENT,
    student
})

export const updateStudent = (student) => ({
    type: UPDATE_STUDENT,
    student
})

export const deleteStudent = (student) => ({
    type: DELETE_STUDENT,
    student
})

// THUNKS

export function fetchCampuses() {
    return function thunk(dispatch) {
        return axios.get('/api/campuses')
            .then(res => res.data)
            .then(campuses => {
                dispatch(getCampuses(campuses));
            });
    };
}

export function postCampus(campus) {
    return function thunk(dispatch) {
        return axios.post('/api/campuses', campus)
            .then(res => res.data)
            .then(campus => {
                dispatch(addNewCampus(campus));
            });
    };
}

export function removeCampus(campusId) {
    return function thunk(dispatch) {
        return axios.delete(`/api/campuses/${campusId}`)
            .then(res => res.data)
            .then(campus => {
                dispatch(deleteCampus(campus));
            });
    };
}

export function fetchStudents() {
    return function thunk(dispatch) {
        return axios.get('/api/students')
            .then(res => res.data)
            .then(students => {
                dispatch(getStudents(students));
            });
    };
}

export function putStudent(student) {
    return function thunk(dispatch) {
        return axios.put(`/api/students/${student.id}`, student)
        .then(res => res.data)
        .then(student => {
            dispatch(updateStudent(student));
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
            });
    };
}

// REDUCER

const rootReducer = function (state = initialState, action) {
    const newState = Object.assign({}, state)
    const index;

    switch (action.type) {
        case GET_CAMPUSES:
            newState.campuses = action.campuses;
            return newState;

        case ADD_NEW_CAMPUS:
            newState.campuses = [...newState.campuses, action.campus];
            return newState;

        case DELETE_CAMPUS:
            index = newState.campuses.indexOf(action.campus);
            if (index > -1) newState.campuses.splice(index, 1);
            return newState;

        case GET_STUDENTS:
            newState.students = action.students;
            return newState;

        case UPDATE_STUDENT:
            index = newState.students.findIndex(student => student.id === action.student.id);
            newState.students[index] = action.student;
            return newState;

        case DELETE_STUDENT:
            index = newState.students.indexOf(action.student);
            if (index > -1) newState.students.splice(index, 1);
            return newState;

        default:
            return state
    }
};

export default rootReducer

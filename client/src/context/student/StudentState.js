import React, { useReducer } from 'react';
import axios from 'axios';
import StudentContext from './studentContext';
import studentReducer from './studentReducer';
import {
  GET_STUDENTS,
  ADD_STUDENT,
  DELETE_STUDENT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_STUDENT,
  FILTER_STUDENTS,
  CLEAR_STUDENTS,
  CLEAR_FILTER,
  STUDENT_ERROR,
} from '../types';

const StudentState = (props) => {
  const initialState = {
    students: null,
    current: null,
    filtered: null,
    error: null,
  };

  const [state, dispatch] = useReducer(studentReducer, initialState);

  // Get Students
  const getStudents = async () => {
    try {
      const res = await axios.get('/api/students');

      dispatch({
        type: GET_STUDENTS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: STUDENT_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // Add Student
  const addStudent = async (student) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post('/api/students', student, config);

      dispatch({
        type: ADD_STUDENT,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: STUDENT_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // Delete Student
  const deleteStudent = async (id) => {
    try {
      await axios.delete(`/api/students/${id}`);

      dispatch({
        type: DELETE_STUDENT,
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: STUDENT_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // Update Student
  const updateStudent = async (student) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.put(
        `/api/students/${student._id}`,
        student,
        config
      );

      dispatch({
        type: UPDATE_STUDENT,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: STUDENT_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // Clear Students
  const clearStudents = () => {
    dispatch({ type: CLEAR_STUDENTS });
  };

  // Set Current Student
  const setCurrent = (student) => {
    dispatch({ type: SET_CURRENT, payload: student });
  };

  // Clear Current Student
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // Filter Students
  const filterStudents = (text) => {
    dispatch({ type: FILTER_STUDENTS, payload: text });
  };

  // Clear Fulter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <StudentContext.Provider
      value={{
        students: state.students,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        addStudent,
        deleteStudent,
        setCurrent,
        clearCurrent,
        updateStudent,
        filterStudents,
        clearFilter,
        getStudents,
        clearStudents,
      }}
    >
      {props.children}
    </StudentContext.Provider>
  );
};

export default StudentState;

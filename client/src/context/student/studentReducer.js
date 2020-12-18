import {
  GET_STUDENTS,
  ADD_STUDENT,
  DELETE_STUDENT,
  CLEAR_STUDENTS,
  SET_CURRENT,
  CLEAR_CURRENT,
  STUDENT_ERROR,
  UPDATE_STUDENT,
  FILTER_STUDENTS,
  CLEAR_FILTER,
  LOADING,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_STUDENTS:
      return {
        ...state,
        students: action.payload.students,
        pages: action.payload.pages,
        page: action.payload.page,
        loading: false,
      };
    case ADD_STUDENT:
      return {
        ...state,
        students: [action.payload, ...state.students],
        loading: false,
      };
    case UPDATE_STUDENT:
      return {
        ...state,
        students: state.students.map((student) =>
          student._id === action.payload._id ? action.payload : student
        ),
        loading: false,
      };
    case DELETE_STUDENT:
      return {
        ...state,
        students: state.students.filter(
          (student) => student._id !== action.payload
        ),
        loading: false,
      };
    case CLEAR_STUDENTS:
      return {
        ...state,
        students: null,
        filtered: null,
        error: null,
        current: null,
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };
    case FILTER_STUDENTS:
      return {
        ...state,
        filtered: state.students.filter((student) => {
          const regex = new RegExp(
            `${action.payload}`,
            'gi'
          ); /*CASE SENSITIVE UPPER OR LOWER CASE*/
          return (
            student.name.match(regex) ||
            student.email.match(regex) ||
            student.block.match(regex)
          );
        }),
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
      };
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case STUDENT_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

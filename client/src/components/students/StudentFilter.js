import React, { useContext, useRef, useEffect } from 'react';
import StudentContext from '../../context/student/studentContext';
import { Form } from 'react-bootstrap';

const StudentFilter = () => {
  const studentContext = useContext(StudentContext);
  const text = useRef('');

  const { filterStudents, clearFilter, filtered } = studentContext;

  useEffect(() => {
    if (filtered === null) {
      text.current.value = '';
    }
  });

  const onChange = (e) => {
    if (text.current.value !== '') {
      filterStudents(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <Form>
      <Form.Control
        type='text'
        ref={text}
        placeholder='Filter Students...'
        onChange={onChange}
      />
    </Form>
  );
};

export default StudentFilter;

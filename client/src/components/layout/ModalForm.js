import React, { useState, useContext } from 'react';
import { Button, Modal, Col, Row } from 'react-bootstrap';
import StudentForm from '../students/StudentForm';
import StudentContext from '../../context/student/studentContext';
import StudentFilter from '../students/StudentFilter';

const ModalForm = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const studentContext = useContext(StudentContext);

  const { current, clearCurrent } = studentContext;

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <>
      <Row>
        <Col sm={8}>
          <StudentFilter />
        </Col>
        <Col sm={4}>
          <Button
            variant='primary'
            onClick={handleShow}
            className='ml-auto d-flex'
          >
            Add Student
          </Button>
        </Col>
      </Row>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop='static'
        keyboard={false}
      >
        <Modal.Header closeButton onClick={clearAll}>
          <Modal.Title>{current ? 'Edit Student' : 'Add Student'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <StudentForm />
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='primary'>Understood</Button>
        </Modal.Footer> */}
      </Modal>
    </>
  );
};

export default ModalForm;

import React, { useContext, useState } from 'react';
import { Card, Button, Badge, Col, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import StudentContext from '../../context/student/studentContext';
import StudentForm from '../students/StudentForm';

const StudentItem = ({ student }) => {
  const studentContext = useContext(StudentContext);
  const { deleteStudent, current, setCurrent, clearCurrent } = studentContext;

  const { _id, imgUrl, name, year, block, phone, email } = student;

  const onDelete = () => {
    deleteStudent(_id);
    clearCurrent();
  };

  // const changeUrl = () => {
  //   if (imgUrl !== null) {
  //     console.log(imgUrl);
  //   }
  // };
  // changeUrl();

  // For Modal Edit Form
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const close = () => {
    clearCurrent();
  };

  return (
    <Col md={3} sm={6}>
      <Card style={{ width: '100%' }} className='mb-4'>
        {imgUrl ? (
          <Card.Img
            variant='top'
            // src={imgUrl}
            src={`uploads/${imgUrl}`}
            // src={uploadedFile.filePath}
            style={{ width: '100% ' }}
          />
        ) : (
          <Card.Img variant='top' src='../uploads/marcelito.jpg' />
        )}
        <div className='year-badge'>
          <Badge
            style={{ float: 'right' }}
            pill
            variant={
              year === '2nd'
                ? 'warning'
                : year === '3rd'
                ? 'danger'
                : year === '4th'
                ? 'primary'
                : 'success'
            }
          >
            {year} year
          </Badge>
        </div>
        <Card.Body>
          <h6 className='text-primary'>{name} </h6>
          <ul className='list'>
            {block && (
              <li>
                <i className='fa fa-cubes'></i> {block}
              </li>
            )}
            {email && (
              <li>
                <i className='fa fa-envelope-o'></i> {email}
              </li>
            )}
            {phone && (
              <li>
                <i className='fa fa-phone'></i> {phone}
              </li>
            )}
          </ul>
          <p>
            {/* THIS MODAL IS FOR EDIT STUDENTS DATA ONLY */}
            <Button
              variant='gray'
              onClick={() => {
                setCurrent(student);
                handleShow();
              }}
            >
              Edit
            </Button>
            <Modal
              show={show}
              onHide={handleClose}
              backdrop='static'
              keyboard={false}
            >
              <Modal.Header closeButton onHide={close}>
                <Modal.Title>
                  {current ? 'Edit Student' : 'Add Student'}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <StudentForm />
              </Modal.Body>
            </Modal>

            {/* END OF EDIT STUDENTS DATA MODAL */}
            <Button variant='danger' onClick={onDelete}>
              Delete
            </Button>
          </p>
        </Card.Body>
      </Card>
    </Col>
  );
};

StudentItem.propTypes = {
  student: PropTypes.object.isRequired,
};

export default StudentItem;

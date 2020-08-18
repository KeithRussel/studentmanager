import React, { useState, useContext, useEffect } from 'react';
import { Form, Row, Col, FormGroup, Button, Image } from 'react-bootstrap';
import StudentContext from '../../context/student/studentContext';
import axios from 'axios';

const StudentForm = () => {
  const studentContext = useContext(StudentContext);

  const { addStudent, updateStudent, clearCurrent, current } = studentContext;

  useEffect(() => {
    if (current !== null) {
      setStudent(current);
    } else {
      setStudent({
        imgUrl: '',
        name: '',
        year: '1st',
        block: '',
        phone: '',
        email: '',
      });
    }
  }, [studentContext, current]);

  const [student, setStudent] = useState({
    imgUrl: '',
    name: '',
    year: '1st',
    block: '',
    phone: '',
    email: '',
  });

  const [file, setFile] = useState('');

  const [filename, setFileName] = useState('Choose File..');
  const [uploadedFile, setUploadedFile] = useState({});

  const { /*imgUrl,*/ name, year, block, phone, email } = student;

  const onChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name.replace(/ /g, '-'));
    setStudent({
      ...student,
      [e.target.id]: e.target.files[0].name.replace(/ /g, '-'),
    });
    // setFileName({ imgUrl: URL.createObjectURL(e.target.files[0]) });
  };

  const twoCalls = (e) => {
    onChange(e);
    onFileChange(e);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const { fileName, filePath } = res.data;

      setUploadedFile({ fileName, filePath });
    } catch (err) {
      if (err.response.status === 500) {
        console.log('The was a problem with the server');
      } else {
        console.log(err.response.data.msg);
      }
    }

    if (current === null) {
      addStudent(student);
    } else {
      updateStudent(student);
    }
    clearAll();
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group>
        <Form.File custom>
          <Form.File.Label htmlFor='imgUrl'>{filename}</Form.File.Label>
          <Form.File.Input
            id='imgUrl'
            key={student.imgUrl || null}
            // name='imgUrl'
            // value={imgUrl}
            onChange={twoCalls}
          />
        </Form.File>
      </Form.Group>
      {/* <Image src={uploadedFile.filePath}></Image> */}
      <Form.Group as={Row}>
        <Col sm={12}>
          <Form.Control
            type='text'
            placeholder='Enter your Name..'
            name='name'
            value={name}
            onChange={onChange}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row}>
        <Col sm={12}>
          <Form.Control
            type='email'
            placeholder='Enter your Email..'
            name='email'
            value={email}
            onChange={onChange}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Col sm={12}>
          <Form.Control
            type='text'
            placeholder='Phone Number'
            name='phone'
            value={phone}
            onChange={onChange}
          />
        </Col>
      </Form.Group>
      <fieldset>
        <Form.Group as={Row}>
          <Form.Label as='legend' column sm={2}>
            Year
          </Form.Label>
          <Col sm={10}>
            <Form.Check
              label='1st'
              type='radio'
              name='year'
              value='1st'
              checked={year === '1st'}
              onChange={onChange}
            />
            <Form.Check
              label='2nd'
              type='radio'
              name='year'
              value='2nd'
              checked={year === '2nd'}
              onChange={onChange}
            />
            <Form.Check
              label='3rd'
              type='radio'
              name='year'
              value='3rd'
              checked={year === '3rd'}
              onChange={onChange}
            />
            <Form.Check
              label='4th'
              type='radio'
              name='year'
              value='4th'
              checked={year === '4th'}
              onChange={onChange}
            />
          </Col>
        </Form.Group>
        <FormGroup as={Row}>
          <Form.Label column sm={2}>
            Block
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              onChange={onChange}
              name='block'
              value={block}
              as='select'
              className='my-1 mr-sm-2'
              custom
            >
              <option value=''>Choose...</option>
              <option value='Block 1'>1</option>
              <option value='Block 2'>2</option>
              <option value='Block 3'>3</option>
              <option value='Block 4'>4</option>
              <option value='Block 5'>5</option>
            </Form.Control>
          </Col>
        </FormGroup>
      </fieldset>

      <Form.Group as={Row}>
        <Col sm={{ span: 10, offset: 2 }}>
          {/* <Button closeButton>Sign in</Button> */}
          <Form.Control
            type='submit'
            value={current ? 'Update Student' : 'Add Student'}
            className='btn btn-primary btn-block'
          />
        </Col>
        <Col sm={{ span: 10, offset: 2 }} className='mt-2'>
          {current && (
            <div>
              <Button variant='light' className='btn-block' onClick={clearAll}>
                Clear
              </Button>
            </div>
          )}
        </Col>
      </Form.Group>
    </Form>
  );
};

export default StudentForm;

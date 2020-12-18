import React, { useContext, useEffect } from 'react';
import Students from '../students/Students';
import Spinner from '../layout/Spinner';
import ModalForm from '../layout/ModalForm';
import AuthContext from '../../context/auth/authContext';
import StudentContext from '../../context/student/studentContext';
import Paginate from '../layout/Paginate';

import { Row } from 'react-bootstrap';

const Home = ({ match }) => {
  const authContext = useContext(AuthContext);
  const studentContext = useContext(StudentContext);

  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;

  const {
    page,
    pages,
    students,
    loading,
    getStudents,
    loadingPage,
  } = studentContext;

  console.log(studentContext);

  useEffect(() => {
    authContext.loadUser();
    loadingPage();
    getStudents(keyword, pageNumber);
    // eslint-disable-next-line
  }, [keyword, pageNumber]);

  return (
    <>
      <ModalForm />
      <Row className='mb-5'>
        {students !== null && !loading ? <Students /> : <Spinner />}
      </Row>
      <Paginate pages={pages} page={page} />
    </>
  );
};

export default Home;

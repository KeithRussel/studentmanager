import React, { useContext, useEffect } from 'react';
import Students from '../students/Students';

import ModalForm from '../layout/ModalForm';
import AuthContext from '../../context/auth/authContext';

import { Row } from 'react-bootstrap';

const Home = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <ModalForm />
      <Row>
        <Students />
      </Row>
    </>
  );
};

export default Home;

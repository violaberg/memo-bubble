import React, { useState } from 'react';

import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import sigIn from '../../assets/logo.jpg';

import { Link, useHistory } from 'react-router-dom';

import styles from '../../styles/SignInUpForm.module.css';
import btnStyles from '../../styles/Button.module.css';
import appStyles from '../../App.module.css';
// import axios from "axios";

import { useSetCurrentUser } from '../../contexts/CurrentUserContext';
import { useRedirect } from '../../hooks/useRedirect';
import { setTokenTimestamp } from '../../utils/utils';
import { axiosReq } from '../../api/axiosDefaults';

function SignInForm() {
  const setCurrentUser = useSetCurrentUser();
  useRedirect('loggedIn');

  const [signInData, setSignInData] = useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState({});

  const { username, password } = signInData;

  const history = useHistory();

  const handleChange = (e) => {
    setSignInData({
      ...signInData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axiosReq.post('/dj-rest-auth/login/', signInData);
      setCurrentUser(data.user);
      setTokenTimestamp(data);
      history.push('/');
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  return (
    <Container className='py-3'>
      <Row className={`${styles.SignInUpForm} mx-auto m-4`}>
        <Col className='my-auto p-0 p-md-2' md={6}>
          <Container className={`${styles.FormContent} text-center`}>
            <h1 className={styles.Header}>Sign in</h1>

            <Form onSubmit={handleSubmit} className='m-auto'>
              <Form.Group controlId='username'>
                <Form.Label className='d-none'>username</Form.Label>
                <Form.Control
                  className={`${styles.Input} mx-auto shadow`}
                  type='text'
                  placeholder='Username'
                  name='username'
                  value={username}
                  onChange={handleChange}
                />
              </Form.Group>
              {errors.username?.map((message, idx) => (
                <Alert variant='warning' key={idx}>
                  {message}
                </Alert>
              ))}

              <Form.Group controlId='password'>
                <Form.Label className='d-none'>Password</Form.Label>
                <Form.Control
                  className={`${styles.Input} mx-auto shadow`}
                  type='password'
                  placeholder='Password'
                  name='password'
                  value={password}
                  onChange={handleChange}
                />
              </Form.Group>
              {errors.password?.map((message, idx) => (
                <Alert variant='warning' key={idx}>
                  {message}
                </Alert>
              ))}

              <Button
                className={`${btnStyles.Button} ${btnStyles.ButtonSecondary} shadow`}
                type='submit'
              >
                Sign In
              </Button>
              {errors.non_field_errors?.map((message, idx) => (
                <Alert variant='warning' key={idx} className='mt-3'>
                  {message}
                </Alert>
              ))}
            </Form>
          </Container>

          <Container className={`shadow my-3 w-75 ${appStyles.Content}`}>
            <Link className={styles.Link} to='/signup'>
              Don't have an account?<br></br> <span>Sign up now!</span>
            </Link>
          </Container>
        </Col>
        <Col
          md={6}
          className={`my-auto d-none d-md-block p-2 ${styles.SignInCol}`}
        >
          <Image className={`${styles.FillerImage} mt-2 shadow`} src={sigIn} alt='Colourful neon bubbles' />
        </Col>
      </Row>
    </Container>
  );
}

export default SignInForm;
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import styles from '../../styles/SignInUpForm.module.css';
import btnStyles from '../../styles/Button.module.css';
import appStyles from '../../App.module.css';

import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import signUp from '../../assets/logo.jpg'

// import axios from "axios";
import { axiosReq } from '../../api/axiosDefaults';
import { useRedirect } from '../../hooks/useRedirect';

const SignUpForm = () => {
  // Check if user is already logged in
  useRedirect('loggedIn');

  // State for form data
  const [signUpData, setSignUpData] = useState({
    username: '',
    password1: '',
    password2: '',
    email: '',
  });

  // Destructure form data
  const { username, password1, password2, email } = signUpData;

  // State for form errors
  const [errors, setErrors] = useState({});

  // React router history
  const history = useHistory();

  // Handle form input change
  const handleChange = (e) => {
    setSignUpData({
      ...signUpData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send post request to sign up endpoint
      await axiosReq.post('/dj-rest-auth/registration/', signUpData);
      const email = signUpData.email;
      // Redirect to email sent page with email as state
      history.push('/email-sent', { email: email });
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  return (
    <Row className={`${styles.SignInUpForm} m-4`}>
      <Col className='my-auto py-2 p-md-2' md={6}>
        <Container className={`${styles.FormContent} text-center`}>
          <h1 className={styles.Header}>Sign up</h1>

          <Form onSubmit={handleSubmit}>
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

            <Form.Group controlId='email'>
              <Form.Label className='d-none'>email</Form.Label>
              <Form.Control
                className={`${styles.Input} mx-auto shadow`}
                type='email'
                placeholder='Email'
                name='email'
                value={email}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId='password1'>
              <Form.Label className='d-none'>Password</Form.Label>
              <Form.Control
                className={`${styles.Input} mx-auto shadow`}
                type='password'
                placeholder='Password'
                name='password1'
                value={password1}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.password1?.map((message, idx) => (
              <Alert variant='warning' key={idx}>
                {message}
              </Alert>
            ))}
            <Form.Group controlId='password2'>
              <Form.Label className='d-none'>Confirm password</Form.Label>
              <Form.Control
                className={`${styles.Input} mx-auto shadow`}
                type='password'
                placeholder='Confirm password'
                name='password2'
                value={password2}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.password2?.map((message, idx) => (
              <Alert variant='warning' key={idx}>
                {message}
              </Alert>
            ))}

            <Button
              className={`${btnStyles.Button} ${btnStyles.ButtonSecondary} shadow`}
              type='submit'
            >
              Sign up
            </Button>
            {errors.non_field_errors?.map((message, idx) => (
              <Alert variant='warning' key={idx} className='mt-3'>
                {message}
              </Alert>
            ))}
          </Form>
        </Container>

        <Container className={`shadow my-3 w-75 ${appStyles.Content}`}>
          <Link className={styles.Link} to='/signin'>
            Already have an account? <span>Sign in</span>
          </Link>
        </Container>
      </Col>
      <Col
        md={6}
        className={`my-auto d-none d-md-block p-2 ${styles.SignUpCol}`}
      >
        <Image
          className={`${styles.FillerImage} shadow`}
          src={signUp}
          alt='Colourful neon bubbles'
        />
      </Col>
    </Row>
  );
};

export default SignUpForm;

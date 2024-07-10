import React from 'react';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Row from 'react-bootstrap/Row';

function CreatEditFormFields({ capsuleData, errors, handleChange }) {
  return (
    <>
      <Row>
        <Form.Group controlId='title'>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type='text'
            name='title'
            value={capsuleData.title?.trim()}
            onChange={handleChange}
          />
        </Form.Group>
        {errors.title?.map((message, idx) => (
          <Alert variant='warning' key={idx}>
            {message}
          </Alert>
        ))}
      </Row>
      <Row>
        <Form.Group controlId='message'>
          <Form.Label>Message</Form.Label>
          <Form.Control
            as='textarea'
            name='message'
            value={capsuleData.message}
            onChange={handleChange}
          />
        </Form.Group>
        {errors.message?.map((message, idx) => (
          <Alert variant='warning' key={idx}>
            {message}
          </Alert>
        ))}
      </Row>
      <Row>
        <Form.Group controlId='release_date'>
          <Form.Label>Release Date</Form.Label>
          <Form.Control
            type='date'
            name='release_date'
            value={capsuleData.release_date}
            onChange={handleChange}
          />
        </Form.Group>
        {errors.release_date?.map((message, idx) => (
          <Alert variant='warning' key={idx}>
            {message}
          </Alert>
        ))}
      </Row>
    </>
  );
}

export default CreatEditFormFields;

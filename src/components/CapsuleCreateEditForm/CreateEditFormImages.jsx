import React from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';
import Asset from '../Asset';
import upload from '../assets/upload.png';
import styles from '../styles/CapsuleCreateForm.module.css';

const CreateEditFormImages = ({
  capsuleData,
  errors,
  handleChangeImage,
  imageInput,
  handleDateChange,
}) => {
  const { uploaded_images } = capsuleData;

  return (
    <Row>
      <Form.Group className='text-center justify-content-between'>
        {uploaded_images.length > 0 ? (
          <>
            {uploaded_images.map((image, idx) => (
              <div key={idx} className='mb-3'>
                <figure>
                  <img
                    className={`my-2 px-2 ${styles.Image}`}
                    src={image.preview}
                    alt='Uploaded'
                  />
                </figure>
                <Form.Control
                  type='date'
                  name={`date_taken_${idx}`}
                  value={image.date_taken}
                  onChange={(e) => handleDateChange('image', idx, e)}
                  className='mb-2'
                />
              </div>
            ))}

            <div>
              <Form.Label
                className='d-flex justify-content-center'
                htmlFor='image-upload'
              >
                <Asset src={upload} message='Click or tap to upload an image' />
              </Form.Label>
            </div>
          </>
        ) : (
          <Form.Label
            className='d-flex justify-content-center'
            htmlFor='image-upload'
          >
            <Asset src={upload} message='Click or tap to upload an image' />
          </Form.Label>
        )}
        <input
          type='file'
          multiple
          id='image-upload'
          accept='image/*'
          onChange={handleChangeImage}
          ref={imageInput}
        />
      </Form.Group>
      {errors.images?.map((message, idx) => (
        <Alert variant='warning' key={idx}>
          {message}
        </Alert>
      ))}
    </Row>
  );
};

export default CreateEditFormImages;

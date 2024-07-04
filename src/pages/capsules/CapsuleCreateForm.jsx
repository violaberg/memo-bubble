import React, { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { axiosReq } from '../../api/axiosDefaults';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Image from 'react-bootstrap/Image';
import Asset from '../../components/Asset';
import upload from '../../assets/upload.png';
import styles from '../../styles/CapsuleCreateForm.module.css';
import btnStyles from '../../styles/Button.module.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useRedirect } from '../../hooks/useRedirect';

function CapsuleCreateForm() {
  useRedirect('loggedOut');
  const [capsuleData, setCapsuleData] = useState({
    title: '',
    message: '',
    release_date: '',
    images: '',
    uploaded_images: [],
    videos: '',
    uploaded_videos: [],
  });

  const { title, message, release_date, images, videos } = capsuleData;

  const [errors, setErrors] = useState({});
  const imageInput = useRef(null);
  const videoInput = useRef(null);
  const history = useHistory();

  const handleChange = (e) => {
    setCapsuleData({
      ...capsuleData,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeImage = (e) => {
    if (e.target.files.length) {
      URL.revokeObjectURL(capsuleData.images);
      setCapsuleData({
        ...capsuleData,
        images: URL.createObjectURL(e.target.files[0]),
        uploaded_images: e.target.files, // Update the state with the uploaded files
      });
    }
  };

  const handleChangeVideo = (e) => {
    if (e.target.files.length) {
      URL.revokeObjectURL(capsuleData.videos);
      setCapsuleData({
        ...capsuleData,
        videos: URL.createObjectURL(e.target.files[0]),
        uploaded_videos: e.target.files, // Update the state with the uploaded files
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('message', message);
      formData.append('release_date', release_date);
      formData.append('images', imageInput.current.files[0]);

      if (imageInput.current.files.length > 0) {
        Array.from(imageInput.current.files).forEach((file) => {
          formData.append('uploaded_images', file);
        });
      }

      if (videoInput.current.files.length > 0) {
        Array.from(videoInput.current.files).forEach((file) => {
          formData.append('videos', file);
        });
      }

      const { data } = await axiosReq.post('/capsules/', formData);
      history.push(`/capsules/${data.id}`);

      console.log('formData', formData.get('uploaded_images'));
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Container>
        <Row>
          <Form.Group controlId='title'>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type='text'
              name='title'
              value={capsuleData.title}
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
        <Row className='my-5'>
          <Form.Group className='text-center justify-content-between'>
            {images ? (
              <>
                {Array.from(imageInput.current.files).map((file, idx) => (
                  <figure key={idx}>
                    <Image
                      className={`my-2 px-2 ${styles.Image}`}
                      src={URL.createObjectURL(file)}
                      rounded
                    />
                  </figure>
                ))}

                <div>
                  <Form.Label
                    className={`${btnStyles.Button} ${btnStyles.Bright} btn`}
                    htmlFor='image-upload'
                  >
                    Change the image
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
          {errors.uploaded_images?.map((message, idx) => (
            <Alert variant='warning' key={idx}>
              {message}
            </Alert>
          ))}
        </Row>
        <Row>
          <Form.Group className='text-center justify-content-between'>
            {videos ? (
              <>
                {Array.from(videoInput.current.files).map((file, idx) => (
                  <figure key={idx}>
                    <video
                      className={`my-2 px-2 ${styles.Image}`}
                      src={URL.createObjectURL(file)}
                      rounded
                    />
                  </figure>
                ))}

                <div>
                  <Form.Label
                    className={`${btnStyles.Button} ${btnStyles.Bright} btn`}
                    htmlFor='video-upload'
                  >
                    Change the video
                  </Form.Label>
                </div>
              </>
            ) : (
              <Form.Label
                className='d-flex justify-content-center'
                htmlFor='video-upload'
              >
                <Asset src={upload} message='Click or tap to upload a video' />
              </Form.Label>
            )}

            <input
              type='file'
              multiple
              id='video-upload'
              accept='video/*'
              onChange={handleChangeVideo}
              ref={videoInput}
            />
          </Form.Group>
          {errors.videos?.map((message, idx) => (
            <Alert variant='warning' key={idx}>
              {message}
            </Alert>
          ))}
        </Row>
        <Row>
          <button
            className={`${btnStyles.Button} ${btnStyles.Blue} mx-auto btn my-5`}
            type='submit'
          >
            Create Capsule
          </button>
        </Row>
      </Container>
    </Form>
  );
}

export default CapsuleCreateForm;

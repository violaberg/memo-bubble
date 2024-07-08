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

  const {
    title,
    message,
    release_date,
    images,
    videos,
    uploaded_images,
    uploaded_videos,
  } = capsuleData;

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
      const fileArray = Array.from(e.target.files);
      setCapsuleData({
        ...capsuleData,
        images: URL.createObjectURL(fileArray[0]),
        uploaded_images: fileArray,
      });
    }
  };

  const handleChangeVideo = (e) => {
    if (e.target.files.length) {
      const fileArray = Array.from(e.target.files);
      setCapsuleData({
        ...capsuleData,
        videos: URL.createObjectURL(fileArray[0]),
        uploaded_videos: fileArray,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('message', message);
    formData.append('release_date', release_date);

    uploaded_images.forEach((file) => {
      formData.append('uploaded_images', file);
    });

    uploaded_videos.forEach((file) => {
      formData.append('videos', file);
    });

    const metadata = {
      uploaded_images_metadata: uploaded_images.map(() => ({
        date_taken: '2024-06-01T12:00:00Z',
        gemini_messages: [{ message: 'Gemini message for image' }],
      })),
      uploaded_videos_metadata: uploaded_videos.map(() => ({
        date_taken: '2024-06-01T12:00:00Z',
        gemini_messages: [{ message: 'Gemini message for video' }],
      })),
    };

    formData.append(
      'uploaded_images_metadata',
      JSON.stringify(metadata.uploaded_images_metadata)
    );
    formData.append(
      'uploaded_videos_metadata',
      JSON.stringify(metadata.uploaded_videos_metadata)
    );

    try {
      const { data } = await axiosReq.post('/capsules/', formData);
      history.push(`/capsules/${data.id}`);
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
            {uploaded_images.length > 0 ? (
              <>
                {uploaded_images.map((file, idx) => (
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
            {uploaded_videos.length > 0 ? (
              <>
                {uploaded_videos.map((file, idx) => (
                  <figure key={idx}>
                    <video
                      className={`my-2 px-2 ${styles.Image}`}
                      src={URL.createObjectURL(file)}
                      rounded
                      controls
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

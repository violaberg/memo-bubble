import React from 'react';
import { useRedirect } from '../../hooks/useRedirect';
import { useState, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Image from 'react-bootstrap/Image';
import Asset from '../../components/Asset';
import upload from '../../assets/upload.png';
import styles from '../../styles/CapsuleCreateForm.module.css';
import btnStyles from '../../styles/Button.module.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

function CapsuleCreateForm() {
  useRedirect('loggeout');
  const [capsuleData, setCapsuleData] = useState({
    title: '',
    message: '',
    date_taken: '',
    // location: '',
    images: '',
    uploaded_images: [],
    videos: '',
    uploaded_videos: [],
  });

  const { title, message, date_taken, images, videos } = capsuleData;

  const [errors, setErrors] = useState({});
  const imageInput = useRef(null);
  const videoInput = useRef(null);

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
      });
    }
  };

  const handleChangeVideo = (e) => {
    if (e.target.files.length) {
      URL.revokeObjectURL(capsuleData.videos);
      setCapsuleData({
        ...capsuleData,
        videos: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  return (
    <Form>
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
          <Form.Group controlId='date_taken'>
            <Form.Label>Date Taken</Form.Label>
            <Form.Control
              type='date'
              name='date_taken'
              value={capsuleData.date_taken}
              onChange={handleChange}
            />
          </Form.Group>
          {errors.date_taken?.map((message, idx) => (
            <Alert variant='warning' key={idx}>
              {message}
            </Alert>
          ))}
        </Row>
        <Row className="my-5">
          <Form.Group className='text-center justify-content-between'>
            {capsuleData.images ? (
              <>
                {Array.from(imageInput.current.files).map((file, idx) => (
                  <figure key={idx}>
                    <Image
                      className={`"my-2 px-2" ${styles.Image}`}
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
          {errors?.uploaded_images?.map((message, idx) => (
            <Alert variant='warning' key={idx}>
              {message}
            </Alert>
          ))}
        </Row>
        <Row>
          <Form.Group className='text-center justify-content-between'>
            {capsuleData.videos ? (
              <>
                {Array.from(videoInput.current.files).map((file, idx) => (
                  <figure key={idx}>
                    <video
                      className={`"my-2 px-2" ${styles.Image}`}
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
                <Asset src={upload} message='Click or tap to upload an video' />
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

          {/* <Form.Group controlId='videos'>
        <Form.Label>Videos</Form.Label>
        <Form.Control type='file' name='videos' onChange={handleChangeVideo} />
      </Form.Group> */}
          {errors.videos?.map((message, idx) => (
            <Alert variant='warning' key={idx}>
              {message}
            </Alert>
          ))}
        </Row>
      </Container>
    </Form>
  );
}

export default CapsuleCreateForm;

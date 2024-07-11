import React from 'react';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Row from 'react-bootstrap/Row';
import Asset from '../Asset';
import upload from '../assets/upload.png';
import styles from '../styles/CapsuleCreateForm.module.css';
import btnStyles from '../styles/Button.module.css';

const CreateEditFormVideos = ({
  capsuleData,
  errors,
  handleChangeVideo,
  videoInput,
  handleChange,
  handleDateChange,
}) => {
  const { uploaded_videos } = capsuleData;
  return (
    <>
      <Row>
        <Form.Group className='text-center justify-content-between'>
          {uploaded_videos.length > 0 ? (
            <>
              {uploaded_videos.map((video, idx) => (
                <div key={idx} className='mb-3'>
                  <figure>
                    <video
                      className={`my-2 px-2 ${styles.Image}`}
                      src={video.preview}
                      controls
                    />
                  </figure>
                  <Form.Control
                    type='date'
                    name={`date_taken_${idx}`}
                    value={video.date_taken}
                    onChange={(e) => handleDateChange('video', idx, e)}
                    className='mb-2'
                  />
                </div>
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
    </>
  );
};

export default CreateEditFormVideos;

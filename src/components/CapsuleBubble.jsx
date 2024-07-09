import React from 'react';
import styles from '../styles/Capsule.module.css';
import { Link, useHistory } from 'react-router-dom';
import GeminiMessages from './GeminiMessages';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Capsule = ({ ...props }) => {
  const history = useHistory();

  // Destructure the props
  const { id, title, message, created_on, updated_on, images, videos } = props;

  // Create an array of images
  const imagesArray = images?.map((image) => image);

  const videosArray = videos?.map((video) => video);

  // console.log('imagesArray', imagesArray);

  // console.log('videosArray', videosArray);

  return (
    <Container>
      <Row className={styles.capsule}>
        <h1>{title}</h1>
        <p>{message}</p>
        <p>
          <strong>Created On: {created_on}</strong>
        </p>
        <p>
          <strong>Updated On: {updated_on}</strong>
        </p>
        <Col>
          <h2>Images</h2>
          {imagesArray?.map((image, id) => (
            <div>
              <div className={styles.polaroid}>
                <img
                  key={id}
                  src={image.url}
                  alt='capsule'
                  style={{ width: '100%', height: 'auto' }}
                />
              </div>
              <strong>Date taken : {image.date_taken}</strong>
              <h3>Gemini message</h3>

              <GeminiMessages itemId={image.id} array={imagesArray} />
            </div>
          ))}
        </Col>
        <Col>
          <h2>Videos</h2>
          {videosArray?.map((video, id) => (
            <div>
              <div className={styles.filmstrip}>
                <video
                  key={id}
                  src={video.url}
                  controls
                  style={{ width: '100%', height: 'auto' }}
                />
              </div>
              <strong>Date taken : {video.date_taken}</strong>
              <h3>Gemini message</h3>

              <GeminiMessages itemId={video.id} array={videosArray} />
            </div>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default Capsule;

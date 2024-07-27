import React from 'react';
import styles from '../styles/Capsule.module.css';
import { useHistory } from 'react-router-dom';
import GeminiMessages from './GeminiMessages';
import { Container, Row, Col } from 'react-bootstrap';
import Button from "react-bootstrap/Button";
import { axiosRes } from '../api/axiosDefaults';
import { MoreDropdown } from '../components/MoreDropDown';
import btnStyles from "../styles/Button.module.css";

const Capsule = ({ ...props }) => {
  const history = useHistory();

  // Destructure the props
  const {
    id,
    title,
    message,
    created_on,
    updated_on,
    images,
    videos,
    is_owner,
  } = props;

  console.log('is_owner', is_owner);

  // Create an array of images
  const imagesArray = images?.map((image) => image);

  const videosArray = videos?.map((video) => video);

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/capsules/${id}/`);
      history.push('/capsules');
    } catch (err) {
      // console.log(err);
    }
  };

  const handleEdit = () => {
    history.push(`/capsules/${id}/edit`);
  };

  // console.log('imagesArray', imagesArray);

  // console.log('videosArray', videosArray);

  return (
    <Container>
      <Row className={styles.capsule}>
        <div className='d-flex'>
          {is_owner && (
            <MoreDropdown handleDelete={handleDelete} handleEdit={handleEdit} />
          )}
        </div>
        <h1>{title}</h1>
        <p>{message}</p>
        <p>
          <span className={styles.CapsuleSpan}>Created On: {created_on}</span>
        </p>
        <p>
          <span className={styles.CapsuleSpan}>Updated On: {updated_on}</span>
        </p>
      </Row>
      <Row className={styles.capsule}>
        <Col>
          <h2>Images</h2>
          {imagesArray?.length > 0 ? (
            imagesArray.map((image, id) => (
              <div key={id}>
                <div className={styles.polaroid}>
                  <img
                    src={image.url}
                    alt='capsule'
                    style={{ width: '100%', height: 'auto' }}
                  />
                </div>
                <span className={styles.CapsuleSpan}>Date taken : {image.date_taken}</span>
                <h3>Gemini message</h3>
                <GeminiMessages itemId={image.id} array={imagesArray} />
              </div>
            ))
          ) : (
            <div>
              <p className={styles.brandName}>No images available</p>
            </div>
          )}
        </Col>
        <Col>
          <h2>Videos</h2>
          {videosArray?.length > 0 ? (
            videosArray.map((video, id) => (
              <div key={id}>
                <div className={styles.filmstrip}>
                  <video
                    src={video.url}
                    controls
                    style={{ width: '100%', height: 'auto' }}
                  />
                </div>
                <span className={styles.CapsuleSpan}>Date taken : {video.date_taken}</span>
                <h3>Gemini message</h3>
                <GeminiMessages itemId={video.id} array={videosArray} />
              </div>
            ))
          ) : (
            <div>
              <p className={styles.brandName}>No videos available</p>
            </div>
          )}
        </Col>
      </Row>
      <div className="text-center">
        <Button
          className={`${btnStyles.Button} ${btnStyles.ButtonSecondary} shadow mr-3 mb-4`}
          onClick={() => history.goBack()}
        >
          Back to all bubbles
        </Button>
      </div>
    </Container>
  );
};

export default Capsule;

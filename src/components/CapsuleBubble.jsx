import React from 'react';
import styles from '../styles/Capsule.module.css';
import { Link, useHistory } from 'react-router-dom';
import GeminiMessages from './GeminiMessages';

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
    <div className={styles.capsuleContainer}>
      <div className={styles.capsule}>
        <h2>{title}</h2>
        <p>{message}</p>
        <p>
          <strong>Created On: {created_on}</strong>
        </p>
        <p>
          <strong>Updated On: {updated_on}</strong>
        </p>
        {imagesArray?.map((image, id) => (
          <div>
            <img
              key={id}
              src={image.url}
              alt='capsule'
              style={{ width: '100%', height: 'auto' }}
            />
            <h3>Date taken : {image.date_taken}</h3>
            <h3>Gemini message</h3>

            <GeminiMessages
              imageId={image.id}
              imagesArray={imagesArray}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Capsule;

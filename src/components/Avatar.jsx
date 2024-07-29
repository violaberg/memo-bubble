import React from 'react';
import styles from '../styles/Avatar.module.css';

const PLACEHOLDER_IMAGE_URL = 'https://memo-bubble-app.s3.eu-west-1.amazonaws.com/media/memo-bubble/placeholder/placeholder.png';

const Avatar = ({ src, height = 25, text, color, fontWeight }) => {
  const avatarSrc = src === null ? PLACEHOLDER_IMAGE_URL : src;

  return (
    <span>
      <img
        className={styles.Avatar}
        src={avatarSrc}
        height={height}
        width={height}
        alt='avatar'
      />
      <span style={{ color, fontWeight }}>{text}</span>
    </span>
  );
};

export default Avatar;

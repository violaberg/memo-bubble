import React from 'react';
import styles from '../styles/Avatar.module.css';
import placeholderImage from '../assets/placeholder.png';

const Avatar = ({ src, height = 25, text, color, fontWeight }) => {
  const avatarSrc = src === null ? placeholderImage : src;

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

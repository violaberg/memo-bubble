import React from "react";
import styles from "../styles/Avatar.module.css";
import placeholderImage from "../assets/placeholder.png";

const Avatar = ({ src, height = 25, text }) => {

  const avatarSrc = src ? src : placeholderImage;

  return (
    <span>
      <img
        className={styles.Avatar}
        src={avatarSrc}
        height={height}
        width={height}
        alt="avatar"
      />
      {text}
    </span>
  );
};

export default Avatar;

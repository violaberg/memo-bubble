import React, { useState, useEffect } from 'react';
import { axiosReq, axiosRes } from '../api/axiosDefaults';
import { useCurrentUser } from '../contexts/CurrentUserContext';
import styles from '../styles/Capsule.module.css';

const LikeButton = ({ capsuleId, likesCount, setLikesCount }) => {
  const currentUser = useCurrentUser();
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const checkIfLiked = async () => {
      if (currentUser) {
        try {
          const { data } = await axiosReq.get(`/likes/?capsule=${capsuleId}`);
          if (data.results.length > 0) {
            setLiked(true);
          }
        } catch (err) {
          console.error('Error checking like status:', err);
        }
      }
    };
    checkIfLiked();
  }, [capsuleId, currentUser]);

  const handleLike = async () => {
    if (!currentUser) return;

    try {
      if (liked) {
        // Unlike the capsule
        const { data } = await axiosReq.get(`/likes/?capsule=${capsuleId}`);
        const likeId = data.results[0].id;
        await axiosRes.delete(`/likes/${likeId}/`);
        setLiked(false);
        setLikesCount((prevCount) => Math.max(prevCount - 1, 0));
      } else {
        // Like the capsule
        await axiosRes.post('/likes/', { capsule: capsuleId });
        setLiked(true);
        setLikesCount((prevCount) => prevCount + 1);
      }
    } catch (err) {
      console.error('Error toggling like status:', err);
    }
  };

  return (
    <div onClick={handleLike} style={{ cursor: 'pointer', color: 'red', fontSize: '2em' }}>
      {liked ? (
        <i className={`${styles.LikeButton} fa-solid fa-heart`}></i>
      ) : (
        <i className="fa-regular fa-heart"></i>
      )}
    </div>
  );
};

export default LikeButton;

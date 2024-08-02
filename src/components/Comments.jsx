import React, { useState, useEffect } from 'react';
import { axiosRes } from '../api/axiosDefaults';
import { useCurrentUser } from '../contexts/CurrentUserContext';
import Button from "react-bootstrap/Button";
import styles from '../styles/Comments.module.css';
import btnStyles from "../styles/Button.module.css";
import { Row, Col } from 'react-bootstrap';

const Comments = ({ capsuleId }) => {
  const currentUser = useCurrentUser();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const { data } = await axiosRes.get(`/comments/?capsule=${capsuleId}`);
        setComments(data);
      } catch (err) {
        console.error('Error fetching comments:', err.response ? err.response.data : err);
      }
    };

    fetchComments();
  }, [capsuleId]);

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    if (!currentUser) {
      console.error('User must be logged in to comment');
      return;
    }
    try {
      const { data } = await axiosRes.post('/comments/', {
        capsule: capsuleId,
        comment: newComment,
      });
      setComments([data, ...comments]);
      setNewComment('');
      setError(null);
    } catch (err) {
      console.error('Error submitting comment:', err.response ? err.response.data : err);
      setError('An error occurred while submitting the comment.');
    }
  };

  return (
    <Row>
      <Col className='col-md-8 col-lg-6 mx-auto'>
        <div className={styles.CommentsSection}>
          <h2>Comments</h2>
          <ul>
            {comments.length > 0 ? (
              comments.map((comment) => (
                <li key={comment.id}>
                  <strong>{comment.owner}</strong>: {comment.comment}
                  <br />
                  <small>Posted on {new Date(comment.created_on).toLocaleString()}</small>
                </li>
              ))
            ) : (
              <li className='text-center'>No comments yet. Be the first one to contribute!</li>
            )}
          </ul>
          {error && <div className={`${styles.ErrorMessage} text-center`}>{error}</div>}
          {!currentUser ? (
            <p className='text-center'><span className={styles.ErrorMessage}>Only signed-in users can leave a comment.</span> Please <a href="/signin">Sign in</a>.</p>
          ) : (
            <form onSubmit={handleCommentSubmit}>
              <textarea
                value={newComment}
                onChange={handleCommentChange}
                placeholder="Add a comment"
                required
              />
              <div className='text-center'>
              <Button className={`${btnStyles.Button} ${btnStyles.ButtonSecondary} shadow mr-3 mb-3`} type="submit">Add Comment</Button>
              </div>
            </form>
          )}
        </div>
    </Col>
    </Row>
  );
};

export default Comments;

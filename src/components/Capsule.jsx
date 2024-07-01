import React from 'react';
import styles from '../styles/Capsule.module.css';

const Capsule = () => {
  return (
    <div className={styles.capsuleContainer}>
      
        <div className={styles.capsule}>
          <h2>title</h2>
          <p>message</p>
        {/* <p><strong>Created On:</strong> {new Date(capsule.created_on).toLocaleDateString()}</p> */}
          <p><strong>Created On:</strong> </p>
          <p><strong>Updated On:</strong> </p>
        </div>
      
    </div>
  );
};

export default Capsule;

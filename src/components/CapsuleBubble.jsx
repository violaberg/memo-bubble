import React from 'react';
import styles from '../styles/Capsule.module.css';

const Capsule = ({ dataResults }) => {

  const capsuleTest = dataResults.map((capsule) => {
    return capsule;
  });

  console.log("capsuleTest", capsuleTest);

  // const title = dataResults.map((capsule) => {
  //   return capsule.title;
  // });
  
  // const message = dataResults.map((capsule) => {
  //   return capsule.message;
  // }
  // );

  // const hasLoaded = dataResults.loaded ? "true" : "false";
  // console.log("loaded", hasLoaded);
  

  return (
    <div className={styles.capsuleContainer}>

      <div className={styles.capsule}>
        <h2>{capsuleTest[0].title}</h2>
        <p>message</p>
        {/* <p><strong>Created On:</strong> {new Date(capsule.created_on).toLocaleDateString()}</p> */}
        <p><strong>Created On:</strong> </p>
        <p><strong>Updated On:</strong> </p>
      </div>

    </div>
  )
};

export default Capsule;

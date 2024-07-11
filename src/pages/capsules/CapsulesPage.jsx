import React, { useEffect } from 'react';
import Capsule from '../../components/CapsuleBubble';
import styles from '../../styles/Capsule.module.css';
import { axiosReq } from '../../api/axiosDefaults';
import useFetchCapsules from '../../hooks/useFetchCapsules';
import Bubbles from './Bubbles';

const CapsulePage = () => {
  const { capsules, setCapsules, loaded, pathname } = useFetchCapsules();

  const dataResults = capsules || [];
  //   console.log('capsules', dataResults)

  return (
    <div className={styles.capsulePage}>
      <h1>Bubbles</h1>
      <Bubbles dataResults={dataResults} hasLoaded={loaded} />
    </div>
  );
};

export default CapsulePage;

import React, { useEffect } from 'react';
import Capsule from '../../components/CapsuleBubble';
import styles from '../../styles/Capsule.module.css';
import { axiosReq } from '../../api/axiosDefaults';
import useFetchCapsules from '../../hooks/useFetchCapsules';
import Bubbles from './Bubbles';

const CapsulePage = () => {
  const { capsules, setCapsules, loaded, pathname } = useFetchCapsules();

  //   console.log('capsules', dataResults)

  return (
    <div className={styles.capsulePage}>
      <Bubbles
        capsules={capsules}
        hasLoaded={loaded}
        setCapsules={setCapsules}
      />
    </div>
  );
};

export default CapsulePage;
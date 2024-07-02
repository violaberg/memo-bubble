import React, { useEffect } from 'react';
import Capsule from '../../components/CapsuleBubble';
import styles from "../../styles/Capsule.module.css";
import { axiosReq } from '../../api/axiosDefaults';
import useFetchCapsules from '../../hooks/useFetchCapsules';

const CapsulePage = () => {

    const { capsules, setCapsules, loaded, pathname } = useFetchCapsules();

    const dataResults = capsules?.results || [];
    console.log("capsules", dataResults);


    


    return (
        <div className={styles.capsulePage}>
            <h1>Capsules</h1>
            <Capsule dataResults={dataResults} />
        </div>
    );
};

export default CapsulePage;
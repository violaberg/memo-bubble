import React from 'react';
import Capsule from '../components/Capsule';
import styles from "../styles/Capsule.module.css";

const CapsulePage = () => {
    return (
        <div className={styles.capsulePage}>
            <h1>Capsules</h1>
            <Capsule />
        </div>
    );
};

export default CapsulePage;
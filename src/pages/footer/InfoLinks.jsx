import React from 'react';
import styles from "../../styles/Footer.module.css";

const InfoLinks = () => {
    return (
        <div className={styles.infoLinks}>
            <h5>Contact & Info</h5>
            <ul>
                <li><a href="/contac">About</a></li>
                <li><a href="/about">Contact</a></li>
                <li><a href="/faq">FAQ</a></li>
            </ul>
        </div>
    );
};

export default InfoLinks;
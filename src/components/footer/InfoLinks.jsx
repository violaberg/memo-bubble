import React from 'react';
import styles from "../../styles/Footer.module.css";

const InfoLinks = () => {
    return (
        <div className={styles.infoLinks}>
            <h3 className={styles.footerHeader}>Contact & Info</h3>
            <ul>
                <li><a href="/contac">About</a></li>
                <li><a href="/about">Contact</a></li>
                <li><a href="/faq">FAQ</a></li>
            </ul>
        </div>
    );
};

export default InfoLinks;
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import styles from "../../styles/Footer.module.css";

const DeveloperDetails = () => {
    return (
        <div className={styles.developerDetails}>
        <h3 className={styles.footerHeader}>Developed by</h3>
        <p>
        <span>Viola Bergere</span><br></br>
            <a href="https://github.com/violaberg" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faGithub} /> GitHub
                    </a>
                {' | '}
            <a href="www.linkedin.com/in/viola-bergere-5a668699" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faLinkedin} /> LinkedIn
            </a>
        </p>
        <p>
        <span>Vasileios Tsimourdagkas</span><br></br>
            <a href="https://github.com/Vasileios20" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faGithub} /> GitHub
                    </a>
                {' | '}
            <a href="https://www.linkedin.com/in/vasileios-tsimourdagkas" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faLinkedin} /> LinkedIn
            </a>
        </p>
        </div>
    );
};

export default DeveloperDetails;
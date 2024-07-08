import React from "react";
import styles from "../../styles/Footer.module.css";

const LegalLinks = () => {
  return (
    <div className={styles.legalLinks}>
      <h5>Legal</h5>
      <ul>
        <li>
          <a href="/privacy">Privacy Policy</a>
        </li>
        <li>
          <a href="/terms">Terms of Service</a>
        </li>
      </ul>
    </div>
  );
};

export default LegalLinks;
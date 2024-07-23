import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import InfoLinks from './InfoLinks';
import LegalLinks from './LegalLinks';
import DeveloperDetails from './DeveloperDetails';
import styles from "../../styles/Footer.module.css";

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <Container fluid>
                <Row>
                    <Col className='text-center' md={4}>
                        <InfoLinks />
                    </Col>
                    <Col className='text-center' md={4}>
                        <LegalLinks />
                    </Col>
                    <Col className='text-center' md={4}>
                        <DeveloperDetails />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className={styles.gemini}>
                        Supported by <a href="https://gemini.google.com/" target="_blank" rel="noopener noreferrer"><span className={styles.GradientText}>Gemini</span></a>
                        </div>
                        <div className={styles.copyRight}>
                            &copy; 2024 All rights reserved <span className={styles.brandName}>MEMO BUBBLE</span>
                        </div>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;

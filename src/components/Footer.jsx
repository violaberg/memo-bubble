import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import InfoLinks from './footer/InfoLinks';
import LegalLinks from './footer/LegalLinks';
import DeveloperDetails from './footer/DeveloperDetails';
import styles from "../styles/Footer.module.css";
import gemini from "../assets/Gemini.png";

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
                        <p className={styles.gemini}>
                        Supported by <a href="https://gemini.google.com/" target="_blank" rel="noopener noreferrer"><span className={styles.GradientText}>Gemini</span></a>
                        </p>
                        <p className={styles.copyRight}>
                            &copy; 2024 All rights reserved <span className={styles.brandName}>MEMO BUBBLE</span>
                        </p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;

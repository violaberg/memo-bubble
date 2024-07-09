import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import InfoLinks from './footer/InfoLinks';
import LegalLinks from './footer/LegalLinks';
import DeveloperDetails from './footer/DeveloperDetails';
import styles from "../styles/Footer.module.css";

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <Container fluid>
                <Row>
                    <Col md={4}>
                        <InfoLinks />
                    </Col>
                    <Col md={4}>
                        <LegalLinks />
                    </Col>
                    <Col md={4}>
                        <DeveloperDetails />
                    </Col>
                </Row>
                <Row>
                    <Col>
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

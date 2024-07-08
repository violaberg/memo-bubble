import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import InfoLinks from '../pages/footer/InfoLinks';
import LegalLinks from '../pages/footer/LegalLinks';
import DeveloperDetails from '../pages/footer/DeveloperDetails';
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
                            &copy; 2024 All rights reserved <span>MEMO BUBBLE</span>
                        </p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;

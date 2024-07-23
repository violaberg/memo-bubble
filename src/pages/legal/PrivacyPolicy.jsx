//import React, { useEffect } from "react";
import React from "react";
import { Container, Col, Row } from 'react-bootstrap';
import styles from '../../styles/ServicesPages.module.css';
//import { useTranslation } from "react-i18next";

export default function PrivacyPolicyPage() {
    /**
     * The PrivacyPolicyPage component is a functional component that renders the about page.
     * It contains information about the company and its values.
     * @returns {JSX.Element}
     */

    //const { t, i18n } = useTranslation();

    //useEffect(() => {
    //    const lng = navigator.language || navigator.userLanguage;
    //    i18n.changeLanguage(lng);
    //}, [i18n]);

    return (
        <>
            <Container className="flex justify-content-center text-center my-3">
            <h1 style={{ fontSize: "25px" }}>Privacy Policy</h1>
                <Row className="mt-5 flex-column">
                    <Col className="mx-auto" md={10}>
                        <p>{PrivacyPolicyPage.description}</p>
                        <div className={styles.PolicyContainer}>
                            <h2 style={{ fontSize: "20px" }}>{PrivacyPolicyPage.section1.title}</h2>
                            <p>{PrivacyPolicyPage.section1.content}</p>
                            <h2 style={{ fontSize: "20px" }}>{PrivacyPolicyPage.section2.title}</h2>
                            <p>{PrivacyPolicyPage.section2.content}</p>
                            <h2 style={{ fontSize: "20px" }}>{PrivacyPolicyPage.section3.title}</h2>
                            <p>{PrivacyPolicyPage.section3.content}</p>
                            <h2 style={{ fontSize: "20px" }}>{PrivacyPolicyPage.section4.title}</h2>
                            <p>{PrivacyPolicyPage.section4.content}</p>
                            <h2 style={{ fontSize: "20px" }}>{PrivacyPolicyPage.section5.title}</h2>
                            <p>{PrivacyPolicyPage.section5.content}</p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
}
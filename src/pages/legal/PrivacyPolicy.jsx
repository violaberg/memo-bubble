//import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
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
            <Container>
                <Row className="mt-5 flex-column">
                    <h1 style={{ fontSize: "25px" }}>{PrivacyPolicyPage.title}</h1>
                    <p>{PrivacyPolicyPage.description}</p>
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
                </Row>
            </Container>
        </>
    );
}
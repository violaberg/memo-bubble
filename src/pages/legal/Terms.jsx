//import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
//import { useTranslation } from "react-i18next";

export default function TermsPage() {
    /**
     * The TermsPage component is a functional component that renders the about page.
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
                    <h1 style={{ fontSize: "25px" }}>{TermsPage.title}</h1>
                    <p>{TermsPage.description}</p>
                    <h2 style={{ fontSize: "20px" }}>{TermsPage.section1.title}</h2>
                    <p>{TermsPage.section1.content}</p>
                    <h2 style={{ fontSize: "20px" }}>{TermsPage.section2.title}</h2>
                    <p>{TermsPage.section2.content}</p>
                    <h2 style={{ fontSize: "20px" }}>{TermsPage.section3.title}</h2>
                    <p>{TermsPage.section3.content}</p>
                    <h2 style={{ fontSize: "20px" }}>{TermsPage.section4.title}</h2>
                    <p>{TermsPage.section4.content}</p>
                    <h2 style={{ fontSize: "20px" }}>{TermsPage.section5.title}</h2>
                    <p>{TermsPage.section5.content}</p>
                    <h2 style={{ fontSize: "20px" }}>{TermsPage.section6.title}</h2>
                    <p>{TermsPage.section6.content}</p>
                    <h2 style={{ fontSize: "20px" }}>{TermsPage.section7.title}</h2>
                    <p>{TermsPage.section7.content}</p>
                    <h2 style={{ fontSize: "20px" }}>{TermsPage.section8.title}</h2>
                    <p>{TermsPage.section8.content}</p>
                    <h2 style={{ fontSize: "20px" }}>{TermsPage.section9.title}</h2>
                    <p>{TermsPage.section9.content}</p>
                </Row>
            </Container>
        </>
    );
}
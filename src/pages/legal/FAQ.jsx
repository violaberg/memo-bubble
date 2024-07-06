//import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
//import { useTranslation } from "react-i18next";

export default function FAQPage() {
    /**
     * The FAQPage component is a functional component that renders the FAQ page.
     * It contains frequently asked questions and answers.
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
                    <h1 style={{ fontSize: "25px" }}>{FAQPage.title}</h1>
                    <p>{FAQPage.description}</p>
                    <h2 style={{ fontSize: "20px" }}>{FAQPage.section1.question}</h2>
                    <p>{FAQPage.section1.answer}</p>
                    <h2 style={{ fontSize: "20px" }}>{FAQPage.section2.question}</h2>
                    <p>{FAQPage.section2.answer}</p>
                    <h2 style={{ fontSize: "20px" }}>{FAQPage.section3.question}</h2>
                    <p>{FAQPage.section3.answer}</p>
                    <h2 style={{ fontSize: "20px" }}>{FAQPage.section4.question}</h2>
                    <p>{FAQPage.section4.answer}</p>
                    <h2 style={{ fontSize: "20px" }}>{FAQPage.section5.question}</h2>
                    <p>{FAQPage.section5.answer}</p>
                    <h2 style={{ fontSize: "20px" }}>{FAQPage.section6.question}</h2>
                    <p>{FAQPage.section6.answer}</p>
                    <h2 style={{ fontSize: "20px" }}>{FAQPage.section7.question}</h2>
                    <p>{FAQPage.section7.answer}</p>
                    <h2 style={{ fontSize: "20px" }}>{FAQPage.section8.question}</h2>
                    <p>{FAQPage.section8.answer}</p>
                    <h2 style={{ fontSize: "20px" }}>{FAQPage.section9.question}</h2>
                    <p>{FAQPage.section9.answer}</p>
                </Row>
            </Container>
        </>
    );
}
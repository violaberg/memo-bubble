import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { useTranslation } from "react-i18next";

export default function FAQPage() {
    /**
     * The FAQPage component is a functional component that renders the FAQ page.
     * It contains frequently asked questions and answers.
     * @returns {JSX.Element}
     */

    const { t, i18n } = useTranslation();

    useEffect(() => {
        const lng = navigator.language || navigator.userLanguage;
        i18n.changeLanguage(lng);
    }, [i18n]);

    return (
        <>
            <Container>
                <Row className="mt-5 flex-column">
                    <h1 style={{ fontSize: "25px" }}>{t("faq.title")}</h1>
                    <p>{t("faq.description")}</p>
                    <h2 style={{ fontSize: "20px" }}>{t("faq.section1.question")}</h2>
                    <p>{t("faq.section1.answer")}</p>
                    <h2 style={{ fontSize: "20px" }}>{t("faq.section2.question")}</h2>
                    <p>{t("faq.section2.answer")}</p>
                    <h2 style={{ fontSize: "20px" }}>{t("faq.section3.question")}</h2>
                    <p>{t("faq.section3.answer")}</p>
                    <h2 style={{ fontSize: "20px" }}>{t("faq.section4.question")}</h2>
                    <p>{t("faq.section4.answer")}</p>
                    <h2 style={{ fontSize: "20px" }}>{t("faq.section5.question")}</h2>
                    <p>{t("faq.section5.answer")}</p>
                    <h2 style={{ fontSize: "20px" }}>{t("faq.section6.question")}</h2>
                    <p>{t("faq.section6.answer")}</p>
                    <h2 style={{ fontSize: "20px" }}>{t("faq.section7.question")}</h2>
                    <p>{t("faq.section7.answer")}</p>
                    <h2 style={{ fontSize: "20px" }}>{t("faq.section8.question")}</h2>
                    <p>{t("faq.section8.answer")}</p>
                    <h2 style={{ fontSize: "20px" }}>{t("faq.section9.question")}</h2>
                    <p>{t("faq.section9.answer")}</p>
                </Row>
            </Container>
        </>
    );
}
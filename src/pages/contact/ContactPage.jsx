//import React, { useEffect } from "react";
import ContactForm from "./ContactForm";
import styles from "../../styles/ServicesPages.module.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
//import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";

const ContactPage = () => {
  //const { t, i18n } = useTranslation();

  //const lng = navigator.language || navigator.userLanguage;

  //useEffect(() => {
  //  i18n.changeLanguage(lng);
  //}, [i18n, lng]);

  return (
    <>
      <Helmet>
        <title>{ContactPage.title}</title>
        <meta name="description" content="Contact us for any inquiries, support, or feedback. We're here to assist you with all your needs. Fill out our contact form or reach us via email or phone. We value your input and look forward to connecting with you." />
        <meta name="keywords" content="contact, support, inquiries, feedback, customer service, help, assistance, email, form, reach out, connect" />
      </Helmet>
      <Container fluid className={`${styles.ContactPageContainer}`}>
        <Row>
          <Col md={10} lg={8} className={`${styles.ContactPageContent} text-center`}>
            <h1>Contact Us</h1>
            <p>
            We value your feedback and inquiries. Whether you have questions about our services or want to share your suggestions, we're here for it.
            Please fill out the form below with your contact information and message, and a member of our team will get back to you as soon as possible. We look forward to hearing from you and assisting you with anything we can. Thank you for choosing <strong className={styles.brandName}>MEMO BUBBLE</strong>!
            </p>
          </Col>
          <Col sm={12} md={8} lg={6} className={`${styles.ContactFormCol} mx-auto`}>
            <ContactForm />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ContactPage;
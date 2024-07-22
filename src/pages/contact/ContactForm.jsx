import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import Container from "react-bootstrap/Container";

import { Link, useHistory, useLocation } from "react-router-dom";

import styles from "../../styles/ContactForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import axios from "axios";

import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
//import { Trans, useTranslation } from "react-i18next";

function ContactForm({ listing_id }) {
  /**
   * The ContactForm component is a functional component that renders a form for sending a message to the site admin.
   * It contains input fields for the name, email, subject, and message of the contact form.
   * It also contains a submit button that sends a request to the API to send the message.
   * @returns {JSX.Element} - The JSX for the component.
   */


  //const { t, i18n } = useTranslation();

  //const lng = navigator.language || navigator.userLanguage;

  //useEffect(() => {

    //i18n.changeLanguage(lng);
  //}, [i18n, lng]);

  const [contactData, setContactData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  const { first_name, last_name, email, subject, message } = contactData;
  const [success, setSuccess] = useState(false);
  const [messageDeleted, setMessageDeleted] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const history = useHistory();

  //const message_form = `${("contactForm.listingMessage")}${listing_id}`;
  const path = useLocation().pathname;

  const [phoneValue, setPhoneValue] = useState();

  //const listingPagePath = path === `/listings/${listing_id}`;

  //contactData.message =
  //  listingPagePath && !messageDeleted
  //    ? message_form
  //    : contactData.message;


  const handleChange = (e) => {
    setContactData({
      ...contactData,
      [e.target.name]: e.target.value,
    });
    if (e.target.name === "message") {
      setMessageDeleted(true);
    }
  };

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isChecked) {
      setErrors({ ...errors, checkbox: [("contactForm.errorMessage")] });
      return;
    }
    contactData.phone_number = phoneValue;
    try {
      await axios.post("/contact/", contactData);
      setSuccess(true);

      setTimeout(() => {
        path === `/listings/${listing_id}`
          ? window.location.reload()
          : history.push("/");
      }, 2000);
    } catch (err) {
      setErrors(err.response?.data);
      console.log(err.response?.data);
      setTimeout(() => {
        setErrors({});
      }, 2500);
    }
  };

  return (
    <Row>
      <Col className='mx-auto'>
        <Container className={`${appStyles.Content} p-3 p-md-4 rounded shadow`}>
          <h1 className={styles.Header}>Contact Form</h1>
          <Form
            onSubmit={handleSubmit}
            className={`d-flex flex-column ${styles.ContactForm}`}
          >
            <Form.Group controlId="first_name" className="">
              <Form.Label className={styles.FormLabel}>
                {ContactForm.name}<span>* {errors.first_name?.map((message, idx) => (
                  <span className={styles.ErrorMessage} key={idx}>
                    {message}
                  </span>
                ))}</span>
              </Form.Label>
              <Form.Control
                className={`${styles.Input} shadow text-start`}
                type="text"
                placeholder="First Name"
                name="first_name"
                value={first_name}
                onChange={handleChange}
                disabled={success ? true : false}
              />
            </Form.Group>


            <Form.Group controlId="last_name">
              <Form.Label className={styles.FormLabel}>
                {ContactForm.lastName}<span>* {errors.last_name?.map((message, idx) => (
                  <span className={styles.ErrorMessage} key={idx}>
                    {message}
                  </span>
                ))}</span>
              </Form.Label>
              <Form.Control
                className={`${styles.Input} shadow text-start`}
                type="text"
                placeholder="Last Name"
                name="last_name"
                value={last_name}
                onChange={handleChange}
                disabled={success ? true : false}
              />
            </Form.Group>


            <Form.Group controlId="email">
              <Form.Label className={styles.FormLabel}>
                {ContactForm.email}<span>* {errors.email?.map((message, idx) => (
                  <span className={styles.ErrorMessage} key={idx}>
                    {message}
                  </span>
                ))}</span>
              </Form.Label>
              <Form.Control
                className={`${styles.Input} shadow text-start`}
                type="email"
                placeholder="Your Email"
                name="email"
                value={email}
                onChange={handleChange}
                disabled={success ? true : false}
              />
            </Form.Group>

            <Form.Group controlId="phone_number">
              <Form.Label className={styles.FormLabel}>{ContactForm.phone}<span>* {errors.phone_number?.map((message, idx) => (
                <span className={styles.ErrorMessage} key={idx}>
                  {message}
                </span>
              ))}</span></Form.Label>
              <PhoneInput
                style={{ paddingLeft: "0.5rem" }}
                className={`${styles.Input} shadow text-start`}
                international
                defaultCountry="IE"
                placeholder="Enter phone number"
                value={phoneValue}
                onChange={setPhoneValue}
                inputComponent={Form.Control}
                containerComponent={Form.Group}
                disabled={success ? true : false} />
            </Form.Group>


            <Form.Group controlId="subject">
              <Form.Label className={styles.FormLabel}>
                {ContactForm.subject}<span>* {errors.subject?.map((message, idx) => (
                  <span className={styles.ErrorMessage} key={idx}>
                    {message}
                  </span>
                ))}</span>
              </Form.Label>
              <Form.Control
                className={`${styles.Input} shadow text-start`}
                type="text"
                placeholder="Subject"
                name="subject"
                value={subject}
                onChange={handleChange}
                disabled={success ? true : false}
              />
            </Form.Group>


            <Form.Group controlId="message">
              <Form.Label className={styles.FormLabel}>
                {ContactForm.message}<span>* {errors.message?.map((message, idx) => (
                  <span className={styles.ErrorMessage} key={idx}>
                    {message}
                  </span>
                ))}</span>
              </Form.Label>
              <Form.Control
                className={`${styles.Input} shadow text-start`}
                as="textarea"
                rows={6}
                placeholder="Your Message"
                //placeholder={
                //  listingPagePath && !messageDeleted
                //    ? message_form
                //    : ContactForm.messagePlaceholder
                //}
                name="message"
                value={message}
                onChange={handleChange}
                disabled={success ? true : false}
              />
            </Form.Group>
            <Form.Group controlId="checkbox">
              <Form.Check
                className={`${styles.Checkbox}`}
                type="checkbox"
                label={<div>
                  <Container
                    components={{
                      1: <Link to="/terms" style={{ textDecoration: "underline" }} target="_blank" />,
                      2: <Link to="/privacyPolicy" style={{ textDecoration: "underline" }} target="_blank" />
                    }}
                  />
                </div>}
                checked={isChecked}
                onChange={handleCheckboxChange}
                disabled={success ? true : false}
              />
              {errors.checkbox && (
                <span className={styles.ErrorMessage}>
                  {errors.checkbox[0]}
                </span>
              )}
            </Form.Group>

            <Button
              className={`${btnStyles.Button} ${btnStyles.ButtonSecondary} shadow mt-3`}
              type="submit"
            >Send
              {ContactForm.btnSend}
            </Button>
            {success && (
              <Alert variant="success" className="mt-3">
                {ContactForm.successMessage}
              </Alert>
            )}
            {errors.non_field_errors?.map((message, idx) => (
              <Alert variant="warning" key={idx} className="mt-3">
                {message}
              </Alert>
            ))}
          </Form>
        </Container>
      </Col>
    </Row>
  );
}

export default ContactForm;
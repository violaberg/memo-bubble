import React from "react";
import { Container, Col, Row } from 'react-bootstrap';
import styles from '../../styles/ServicesPages.module.css';

const FAQPage = () => {
    const faqs = [
        {
            question: "What is this website about?",
            answer: "This website is a platform for users to create, share, and explore memory capsules presented as bubbles. Each capsule can contain various types of media and information, allowing users to compile and share their memories in an engaging way."
        },
        {
            question: "How do I create an account?",
            answer: "To create an account, click on the 'Sign Up' button on the top right corner of the homepage. Fill in the required details, including your username, email, and password, and follow the instructions to complete the registration process."
        },
        {
            question: "How can I reset my password?",
            answer: "If you’ve forgotten your password, click on the 'Forgot Password' link on the sign-in page. Enter your registered email address, and you will receive a link to reset your password. Follow the instructions in the email to create a new password."
        },
        {
            question: "How do I create a new capsule?",
            answer: "To create a new capsule, sign in to your account and navigate to the 'Create Capsule' page. Fill in the required fields, upload your media, and customize your capsule. Once you’re done, click on the 'Publish' button to make your capsule live."
        },
        {
            question: "Can I edit or delete my capsules?",
            answer: "Yes, you can edit or delete your capsules at any time. Go to your profile, find the capsule you want to edit or delete, and click on the corresponding options. Make the necessary changes or confirm deletion as needed."
        },
        {
            question: "How can I contact support?",
            answer: "If you need assistance, you can contact our support team through the 'Contact Us' page. Fill out the form with your details and a description of your issue, and our support team will get back to you as soon as possible."
        },
        {
            question: "Is my personal information safe?",
            answer: "Yes, we prioritize the security of your personal information. Our website uses industry-standard security measures to protect your data. Please refer to our Privacy Policy for more details on how we handle your information."
        },
        {
            question: "Can I share my capsules on social media?",
            answer: "Absolutely! Each capsule has sharing options that allow you to easily share your content on various social media platforms. Look for the share buttons on your capsule page to spread your creations."
        },
        {
            question: "What should I do if I encounter a bug?",
            answer: "If you encounter a bug or any technical issues, please report it to our support team via the 'Contact Us' page. Provide as much detail as possible about the issue, including screenshots if applicable, so we can resolve it promptly."
        }
    ];

    return (
        <Container className="flex justify-content-center text-center my-3">
            <h1 className="pb-3">Frequently Asked Questions</h1>
            <Row className="my-3 flex-column">
                <Col className="mx-auto" md={10}>
                <p className="pb-3">Welcome to our FAQ section! Here you will find answers to the most commonly asked questions about our services. We aim to provide clear and concise information to help you better understand our offerings and resolve any queries you may have. If you need further assistance, please do not hesitate to contact us directly.</p>
                <div className={styles.FaqContainer}>
                    {faqs.map((faq, index) => (
                        <div key={index}>
                            <h2 style={{ fontSize: "20px" }}>{faq.question}</h2>
                            <p>{faq.answer}</p>
                        </div>
                    ))}
                </div>
                </Col>
            </Row>
        </Container>
    );
}

export default FAQPage;

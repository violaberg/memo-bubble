//import React, { useEffect } from "react";
import React from "react";
import { Container, Col, Row } from 'react-bootstrap';
import styles from '../../styles/ServicesPages.module.css';
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
            <Container className="flex justify-content-center text-center my-3">
                <h1 className="pb-3">Terms of Service</h1>
                <Row className="my-3 flex-column">
                    <Col className="mx-auto" md={10}>
                        <p>
                        Read our Terms of Service to understand the rules and guidelines for using Memo Bubble, including user responsibilities, privacy practices, and legal information.
                        </p>
                        <p>Last Updated: <strong>23rd July 2024</strong></p>
                        <div className={styles.TermsContainer}>
                    
                            <h2 style={{ fontSize: "20px" }}>1. Acceptance of Terms</h2>
                            <p>By accessing or using the Memo Bubble App, you acknowledge that you have read, understood, and agree to be bound by these Terms, as well as our Privacy Policy.</p>
                            
                            <h2 style={{ fontSize: "20px" }}>2. Changes to Terms</h2>
                            <p>We may modify these Terms at any time. Any changes will be effective immediately upon posting the updated Terms. Your continued use of the App and Services after the posting of revised Terms signifies your acceptance of the changes.</p>
                            
                            <h2 style={{ fontSize: "20px" }}>3. Eligibility</h2>
                            <p>You must be at least 13 years old to use the Memo Bubble App. By using the App, you represent and warrant that you meet this age requirement.</p>
                            
                            <h2 style={{ fontSize: "20px" }}>4. Account Registration</h2>
                            <p>To use certain features of the App, you may need to create an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete. You are responsible for safeguarding your account credentials and for all activities that occur under your account.</p>
                            
                            <h2 style={{ fontSize: "20px" }}>5. Use of the App</h2>
                            <p>You agree to use the Memo Bubble App in accordance with all applicable laws and regulations. You agree not to:
                                <ul>
                                    <li>Use the App for any illegal or unauthorized purpose.</li>
                                    <li>Post or transmit any content that is unlawful, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, or otherwise objectionable.</li>
                                    <li>Impersonate any person or entity or falsely state or otherwise misrepresent your affiliation with a person or entity.</li>
                                    <li>Interfere with or disrupt the App or servers or networks connected to the App.</li>
                                </ul>
                            </p>
                            
                            <h2 style={{ fontSize: "20px" }}>6. User Content</h2>
                            <p>You retain all rights to the content you submit, post, or display on or through the App ("User Content"). By submitting User Content, you grant us a worldwide, non-exclusive, royalty-free, transferable license to use, reproduce, distribute, prepare derivative works of, and display the User Content in connection with the App and our business.</p>
                            
                            <h2 style={{ fontSize: "20px" }}>7. Intellectual Property</h2>
                            <p>The App and its original content, features, and functionality are and will remain the exclusive property of Memo Bubble and its licensors. The App is protected by copyright, trademark, and other laws of both the United States and foreign countries.</p>
                            
                            <h2 style={{ fontSize: "20px" }}>8. Termination</h2>
                            <p>We may terminate or suspend your account and access to the App at our sole discretion, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms. Upon termination, your right to use the App will immediately cease.</p>
                            
                            <h2 style={{ fontSize: "20px" }}>9. Limitation of Liability</h2>
                            <p>In no event shall Memo Bubble, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the App.</p>
                            
                            <h2 style={{ fontSize: "20px" }}>10. Disclaimer of Warranties</h2>
                            <p>The App is provided on an "AS IS" and "AS AVAILABLE" basis. Memo Bubble makes no warranties, whether express or implied, including without limitation, implied warranties of merchantability, fitness for a particular purpose, non-infringement, and course of dealing or performance.</p>
                            
                            <h2 style={{ fontSize: "20px" }}>11. Governing Law</h2>
                            <p>These Terms shall be governed and construed in accordance with the laws of [Your Country/State], without regard to its conflict of law provisions.</p>
                            
                            <h2 style={{ fontSize: "20px" }}>12. Contact Us</h2>
                            <p>If you have any questions about these Terms, please contact us at info@memobubble.com.</p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
}
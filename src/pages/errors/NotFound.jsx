import React from "react";
import { Container, Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import styles from '../../styles/ServicesPages.module.css';
import btnStyles from '../../styles/Button.module.css';
import BubbleGame from '../../components/BubbleGame';

const NotFound = () => {
  return (
    <Container className="flex justify-content-center text-center my-3">
      <Row className={styles.ErrorContainer}>
        <Col className="d-flex flex-column align-items-center">
        <h1>Bubble Trouble!</h1>
          <div className="p-3 mb-3" md={10}>
            <p>Looks like our page has floated away in a bubble. While we keep looking for it, pop a few bubbles for fun or head back to home page!</p>
          </div>
          <BubbleGame /> {/* Add bubble game component */}
          <Button
            className={`${btnStyles.Button} ${btnStyles.ButtonTertiary} mt-3`}
            href="/"
          >
            Back to Home Page
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;

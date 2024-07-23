import React from "react";
import { Container, Col, Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import styles from '../../styles/ServicesPages.module.css';
import btnStyles from '../../styles/Button.module.css';
import bubbleStyles from '../../styles/Bubbles.module.css';

const Forbidden403 = () => {
  return (
    <Container className="flex justify-content-center text-center my-3">
      <Row className={styles.ErrorContainer}>
        <Col className="d-flex flex-column align-items-center">
        <h1>Oops! Bubble Trouble!</h1>
          <div className="p-3 mb-3" md={10}>
            <p>It looks like you’ve stumbled upon restricted area! Don’t worry, pop a few bubbles for fun or head back to home page!</p>
          </div>
          <div>
            <Card className={`${bubbleStyles.Bubble} mx-auto mt-5`}>
            </Card>
        </div>
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

export default Forbidden403;
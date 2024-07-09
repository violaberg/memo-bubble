import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const About = () => {
  return (
    <Container className="mt-3">
      <Row>
        <Col className="mx-auto" md={10}>
          <h1>About Memo Bubble</h1>
          <section>
            <p>
                Memo Bubble was born from a desire to preserve and share precious memories for future generations in a unique, modern and engaging way. 
                Our team, inspired by the fleeting nature of moments, aimed to create a digital sanctuary where memories 
                could be stored, revisited, and cherished forever.
            </p>
            <p>
                Our platform allows users to create capsules of memories represented as bubbles. Each capsule can include text message, images, videos and Gemini AI generated fact message about the day memories were created. 
                Each capsule can be set to release at a specific date, making it perfect for special occasions, anniversaries, 
                and personal milestones. Join Memo Bubble in celebrating life's moments no matter how small!
            </p>
          </section>
        </Col>
      </Row>
    </Container>
  );
};

export default About;

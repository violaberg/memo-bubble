import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import logo from '../assets/logo.jpg';
import styles from '../styles/Home.module.css';
import btnStyles from '../styles/Button.module.css';

const Home = () => {
  const history = useHistory();

    return (
      <Container className="flex justify-content-center text-center my-3">
        <Row className="m-auto">
          <Col>
            <h1>Welcome to <span className={styles.brandName}>MEMO BUBBLE</span></h1>
            <img src={logo} alt="logo" className={styles.logoImg}></img>
          </Col>
          <Row className="mx-auto">
            <Col className="mx-auto" md={10}>
            <section>
              <p>
                Memories are the threads that weave the tapestry of our lives,
                capturing moments that define who we are and where we have been.
                They hold the laughter of shared joy, the warmth of a loved
                one's embrace, and the lessons learned from challenges faced.
                Each memory is a snapshot in time, a fragment of our personal
                history that shapes our present and guides our future.
              </p>

              <p>
                Cherished memories can bring solace during difficult times,
                offering a sense of continuity and connection. They remind us of
                our strengths and the love that surrounds us, providing a
                foundation of comfort and hope. Happy memories can reignite a
                sense of joy and wonder, allowing us to relive the moments that
                brought light into our lives.
              </p>

              <p>
                Conversely, memories of loss and hardship teach resilience and
                fortitude. They are reminders of battles fought and survived, of
                growth through adversity. These memories, while sometimes
                painful, are integral to our journey, shaping our character and
                deepening our empathy.
              </p>

              <p>
                In a world that is ever-changing, memories are the constants we
                can hold onto. They are treasures stored within us, accessible
                at any moment to bring clarity, inspiration, or simply a smile.
                Whether it's a childhood adventure, a milestone achieved, or the
                simple beauty of a quiet moment, each memory is a testament to
                the richness of our human experience.
              </p>

              <p>
                As we move forward, creating new memories and cherishing the
                old, we carry with us the essence of all we have experienced.
                Memories are the legacy of our lives, the stories we tell, and
                the emotions we feel. They are a reminder that every moment
                matters and that our lives are a collection of precious,
                unforgettable moments.
              </p>
            </section>
            <Button
              className={`${btnStyles.Button} ${btnStyles.ButtonPrimary}`}
              onClick={() => history.push(`/capsules`)}
            >
              Enter memory sanctuary
            </Button>
          </Col>
        </Row>
      </Row>
    </Container>
  );
};

export default Home;

import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styles from '../styles/About.module.css';

const About = () => {
  return (
    <Container className="mt-3">
      <Row>
        <Col className="mx-auto mb-3" md={10}>
          <h1>About <span className={styles.brandName}>MEMO BUBBLE</span></h1>
          <section>
            <p>
            Memo Bubble was born from a desire to preserve and share precious memories for future generations in a unique, modern, and engaging way.
            Our team, inspired by the fleeting nature of moments, aimed to create a digital sanctuary where memories could be stored, revisited, and cherished forever.
            </p>
            <p>
            In a world where time passes swiftly and memories can fade, Memo Bubble provides a timeless solution.
            Our platform allows users to create capsules of memories represented as bubbles.
            Each capsule can include a text message generated with the help of Gemini, our intuitive AI assistant, along with the location, images, and videos from the day the memories were created.
            This ensures that every detail, from heartfelt messages to vivid visuals, is captured and preserved with care.
            </p>
            <p>
            But Memo Bubble offers more than just a storage space. Each capsule can be set to release at a specific date, making it perfect for commemorating special occasions, anniversaries, and personal milestones.
            Imagine receiving a message from your past self on your wedding anniversary or opening a capsule on your child's 18th birthday filled with their earliest moments.
            These are the kinds of experiences that Memo Bubble aims to create—moments of surprise, joy, and reflection.
            </p>
            <p>
            Our mission is to celebrate life's moments, no matter how small, and to give everyone the ability to hold onto their memories in a meaningful way.
            Join Memo Bubble in this journey of capturing the essence of life, and ensuring that your most cherished moments are never lost, but instead, live on to inspire and bring happiness to you and your loved ones.
            </p>
            <p>
            Moreover, Memo Bubble allows you to create messages not only for your loved ones but also for future generations and the general public.
            By setting your capsules to public, you can share your wisdom, experiences, and stories with a broader audience, creating a lasting legacy that transcends time.
            These public capsules can serve as a source of inspiration, knowledge, and connection for people you may never meet but whose lives you can touch with your memories.
            </p>
            <p>
            At Memo Bubble, we believe that every memory is a story worth telling and preserving.
            Our platform is designed with simplicity and user-friendliness in mind, so you can effortlessly create and customize your memory capsules.
            Whether it's a grand celebration or a simple everyday moment, Memo Bubble is here to help you honor and remember it.
            </p>
            <p>
            Join us today and be part of a community that values and cherishes the beauty of memories. Together, let's celebrate life's journey, one bubble at a time.
            </p>
            <strong>
              Yours Sincerely,<br></br>
              <span className={styles.brandName}>MEMO BUBBLE</span> team
            </strong>
          </section>
        </Col>
      </Row>
    </Container>
  );
};

export default About;

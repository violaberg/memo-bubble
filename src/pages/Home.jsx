import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import logo from "../assets/logo.jpg";
import styles from "../styles/Home.module.css";
import btnStyles from '../styles/Button.module.css';

const Home = () => {

    return (
      <Container className="flex justify-content-center text-center my-3">
        <Row className="m-auto">
          <Col>
            <h1>Welcome to <span className={styles.brandName}>MEMO BUBBLE</span>!</h1>
            <img src={logo} alt="logo" className={styles.logoImg}></img>
          </Col>
          <Row className="mx-auto">
            <Col>
              <Button className={`${btnStyles.Button} ${btnStyles.ButtonPrimary}`}
                type='submit'>Enter memory sanctuary</Button>
            </Col>
          </Row>
        </Row>
      </Container>
    );
  };
  
  export default Home;
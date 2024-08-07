import React, { useEffect, useState } from "react";

import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

import { useHistory, useParams } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../../contexts/CurrentUserContext";

import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import styles from "../../styles/ProfilePage.module.css";

const UsernameForm = () => {
  /**
   * The UsernameForm component is a functional component that renders a form for editing the user's username.
   * It fetches the user's username from the API and updates the user's username.
   * @returns {JSX.Element} - The JSX for the component.
   */

  const [username, setUsername] = useState("");
  const [errors, setErrors] = useState({});

  const history = useHistory();
  const { id } = useParams();

  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  // Gets the user's username from the API and sets the username state.
  useEffect(() => {
    if (currentUser?.profile_id?.toString() === id) {
      setUsername(currentUser.username);
    } else {
      history.push("/");
    }
  }, [currentUser, history, id]);

  // Updates the user's username in the API and sets the current user state.
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosRes.put("/dj-rest-auth/user/", {
        username,
      });
      setCurrentUser((prevUser) => ({
        ...prevUser,
        username,
      }));
      history.goBack();
    } catch (err) {
      // console.log(err);
      setErrors(err.response?.data);
    }
  };

  return (
    <Row className="mx-2" style={{ marginTop: "8rem" }}>
      <Col className="py-2 mx-auto text-center" md={6} lg={4}>
        <Container className={`${appStyles.Content} mx-auto shadow`}>
          <Form onSubmit={handleSubmit} className="my-2">
            <Form.Group>
              <Form.Label className={styles.ProfileFormHeader}>Change username</Form.Label>
              <Form.Control
                placeholder="username"
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                className={`${styles.Input} mx-auto my-2 shadow w-75`}
              />
            </Form.Group>
            {errors?.username?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}
            <Button
              className={`${btnStyles.Button} ${btnStyles.ButtonDanger} shadow mr-3`}
              onClick={() => history.goBack()}
            >
              cancel
            </Button>
            <Button
              className={`${btnStyles.Button} ${btnStyles.ButtonSecondary} shadow`}
              type="submit"
            >
              save
            </Button>
          </Form>
        </Container>
      </Col>
    </Row>
  );
};

export default UsernameForm;
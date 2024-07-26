import React, { useEffect, useState } from "react";

import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

import { useHistory, useParams } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import styles from "../../styles/ProfilePage.module.css";

const UserPasswordForm = () => {
  /**
   * The UserPasswordForm component is a functional component that renders a form for editing the user's password.
   * It fetches the user's password from the API and updates the user's password.
   * @returns {JSX.Element} - The JSX for the component.
   */
  const history = useHistory();
  const { id } = useParams();
  const currentUser = useCurrentUser();

  const [userData, setUserData] = useState({
    new_password1: "",
    new_password2: "",
  });
  const { new_password1, new_password2 } = userData;

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    if (currentUser?.profile_id?.toString() !== id) {
      // redirect user if they are not the owner of this profile
      history.push("/");
    }
  }, [currentUser, history, id]);

  // Update the user's password and redirect to the previous page.
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosRes.post("/dj-rest-auth/password/change/", userData);
      history.goBack();
    } catch (err) {
      // console.log(err);
      setErrors(err.response?.data);
    }
  };

  return (
    <Row className="mt-5 pt-5">
      <Col className="py-5 mx-auto text-center" md={6} lg={4}>
        <Container className={`${appStyles.Content} mx-auto shadow`}>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label className={`${styles.ProfileFormHeader}`}>New password</Form.Label>
              <Form.Control
                placeholder="New Password"
                type="password"
                value={new_password1}
                onChange={handleChange}
                name="new_password1"
                className={`${styles.Input} mx-auto my-2 shadow w-75`}
              />
            </Form.Group>
            {errors?.new_password1?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}
            <Form.Group>
              <Form.Label className={`${styles.ProfileFormHeader}`}>Confirm password</Form.Label>
              <Form.Control
                placeholder="Confirm New Password"
                type="password"
                value={new_password2}
                onChange={handleChange}
                name="new_password2"
                className={`${styles.Input} mx-auto my-2 shadow w-75`}
              />
            </Form.Group>
            {errors?.new_password2?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}
            <Button
              className={`${btnStyles.Button} ${btnStyles.ButtonDanger} shadow m-3`}
              onClick={() => history.goBack()}
            >
              cancel
            </Button>
            <Button
              type="submit"
              className={`${btnStyles.Button} ${btnStyles.ButtonSecondary} shadow`}
            >
              save
            </Button>
          </Form>
        </Container>
      </Col>
    </Row>
  );
};

export default UserPasswordForm;